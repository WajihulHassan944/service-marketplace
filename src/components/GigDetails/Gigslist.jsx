'use client';

import React, { useEffect } from 'react';
import styles from './Gigs.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGigs } from '@/redux/features/gigsSlice';

const GigListSection = ({ userId, excludeGigId, currentGig }) => {
  const dispatch = useDispatch();
  const { gigs, status, error } = useSelector((state) => state.gigs);

  useEffect(() => {
    dispatch(fetchGigs());
  }, [dispatch]);

  const filteredGigs = gigs.filter(
    (gig) => gig.userId?._id === userId && gig._id !== excludeGigId
  );

  const getActivePackages = (packages) => {
    const active = {};
    if (packages?.basic) active.basic = packages.basic;
    if (packages?.standard) active.standard = packages.standard;
    if (packages?.premium) active.premium = packages.premium;
    return active;
  };

  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/^./, (str) => str.toUpperCase());
  };

  const formatValue = (value) => {
    if (typeof value === 'boolean') return value ? '✔' : '✖';
    if (typeof value === 'number') return value;
    if (value === null || value === undefined) return '—';
    return value.toString();
  };

  const renderPackageTable = (gig) => {
    const activePackages = getActivePackages(gig.packages);
    const columns = Object.keys(activePackages);

    // Collect all unique keys from all package types
    const allKeys = Array.from(
      new Set(
        columns.flatMap((pkgType) => Object.keys(activePackages[pkgType] || {}))
      )
    );

    if (columns.length === 0 || allKeys.length === 0) return null;

    return (
      <div className={styles.packageWrapper} key={gig._id}>
        <div
          className={styles.packageTable}
          style={{ gridTemplateColumns: `1fr repeat(${columns.length}, 1fr)` }}
        >
          {/* Header Row */}
          <div className={`${styles.headerCell} ${styles.firstCol}`}>Field</div>
          {columns.map((pkgType) => (
            <div key={pkgType} className={styles.headerCell}>
              {pkgType.charAt(0).toUpperCase() + pkgType.slice(1)}
            </div>
          ))}

          {/* Dynamic Rows */}
          {allKeys.map((key) => (
            <React.Fragment key={key}>
              <div className={styles.firstCol}>{formatLabel(key)}</div>
              {columns.map((pkgType) => (
                <div key={pkgType + key} className={styles.cell}>
                  {formatValue(activePackages[pkgType][key])}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {currentGig && renderPackageTable(currentGig)}
      {status === 'loading' && <p>Loading gigs...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {filteredGigs.map(renderPackageTable)}
    </div>
  );
};

export default GigListSection;
