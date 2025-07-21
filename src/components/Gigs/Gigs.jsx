'use client';

import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGigs } from '@/redux/features/gigsSlice';
import Filters from './Filters';
import GigCard from './GigCard';
import { useSearchParams, useRouter } from 'next/navigation';

const Gigs = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { gigs, status, error } = useSelector((state) => state.gigs);

  const category = searchParams.get('category');
  const subCategory = searchParams.get('subCategory');
  const serviceType = searchParams.get('service');
  const sellerLevel = searchParams.get('level');
  const budget = searchParams.get('budget');
  const delivery = searchParams.get('delivery');
  const sort = searchParams.get('sort');
  const search = searchParams.get('search')?.toLowerCase() || '';

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGigs());
    }
  }, [status, dispatch]);

  const hasAnyFilter =
    category || subCategory || serviceType || sellerLevel || budget || delivery || sort || search;

const filteredGigs = useMemo(() => {
  let data = [...gigs];

  if (search) {
    const searchWords = search.split(/\s+/).map((w) => w.toLowerCase());

    data = data.filter((gig) => {
      const fieldsToSearch = [
        gig.gigTitle,
        gig.description,
        gig.category,
        gig.subcategory,
        gig.userId?.firstName,
        gig.userId?.lastName,
        gig.packages?.basic?.description,
      ];

      const combinedText = fieldsToSearch
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchWords.some((word) => combinedText.includes(word));
    });
  }

  if (category) data = data.filter((gig) => gig.category === category);
  if (subCategory) data = data.filter((gig) => gig.subcategory === subCategory);
  if (serviceType === 'hourly') data = data.filter((gig) => gig.hourlyRate);
  if (sellerLevel)
    data = data.filter(
      (gig) =>
        gig.userId?.sellerDetails?.level?.toLowerCase() === sellerLevel.toLowerCase()
    );
  if (budget) {
    const [min, max] = budget.split('-').map(Number);
    data = data.filter((gig) => {
      const price = gig.packages?.basic?.price || 0;
      return price >= min && price <= max;
    });
  }
  if (delivery)
    data = data.filter(
      (gig) => gig.packages?.basic?.deliveryTime <= Number(delivery)
    );

  if (sort === 'oldest') {
    data = data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sort === 'newest') {
    data = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sort === 'lowToHigh') {
    data = data.sort(
      (a, b) => (a.packages?.basic?.price || 0) - (b.packages?.basic?.price || 0)
    );
  }

  return data;
}, [gigs, category, subCategory, serviceType, sellerLevel, budget, delivery, sort, search]);

  const clearFilters = () => {
    router.push('/services');
  };

  return (
    <div>
      <Filters resultsCount={filteredGigs.length} />

      {hasAnyFilter && (
        <div style={{ paddingLeft:'10%', marginBottom: '1rem', marginTop:'1rem' }}>
          <button
            onClick={clearFilters}
            style={{
              backgroundColor: '#334155',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Clear Filters
          </button>
        </div>
      )}

      <div className="gigs-cards-in-services">
        {status === 'loading' && <p>Loading gigs...</p>}
        {status === 'failed' && <p>Error: {error}</p>}
        {status === 'succeeded' && filteredGigs.length === 0 && <p>No gigs found.</p>}

       {status === 'succeeded' &&
  filteredGigs
    .filter(gig => gig.status === 'active')
    .map((gig) => (
      <GigCard
        key={gig._id}
        data={{
          gigId: gig._id,
          image: gig.images?.[0]?.url || '/assets/gigs/dummytwo.png',
          avatar: gig.userId?.profileUrl || '/assets/gigs/avatar.png',
          sellerName: `${gig.userId?.firstName || ''} ${gig.userId?.lastName || ''}`,
          badge: gig.userId?.sellerDetails?.level || 'New Seller',
          title: gig.gigTitle,
          rating: 5,
          reviews: 0,
          price: `$${gig.packages?.basic?.price || gig.packages?.standard?.price || 'N/A'}`,
          offersVideo: true,
        }}
      />
    ))}

      </div>
    </div>
  );
};

export default Gigs;
