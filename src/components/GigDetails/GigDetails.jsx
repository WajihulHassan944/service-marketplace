import Image from "next/image";
import styles from "./GigDetails.module.css";

const GigDetails = () => {
  return (
    <div className={styles.containerGigDetails}>
      <nav className={styles.breadcrumb}>
        <span>🏠 / Programming & Tech</span> / <span>Software Development</span> / <span>Web Application</span>
      </nav>

      <h1 className={styles.title}>
        I will create a personal portfolio website or business website
      </h1>

      <div className={styles.sellerInfo}>
        <Image src="/assets/gigs/avatar.png" alt="Hossain Rabbi" width={50} height={50} className={styles.profileImage} />
        <div>
          <strong>Hossain Rabbi</strong> <span className={styles.level}>Level 1</span>
          <div className={styles.rating}>★★★★★ <span>(37 reviews)</span></div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.leftContent}>
          <div className={styles.imageSlider}>
            <Image src="/assets/gigs/dummy.png" alt="Gig Image" width={800} height={500} />
          </div>

          <section className={styles.aboutSection}>
            <h2>About this gig</h2>
            <h3>Personal Portfolio Website & Business Website | 100+ Projects Completed</h3>
            <p>
              Looking for a <strong>stunning personal portfolio website</strong> or a <strong>professional business presence online</strong>?
            </p>
            <p>
              Hi, I'm Hossain, a <strong>skilled web developer</strong> with <strong>7+ years of experience</strong> and <strong>100+ successful projects</strong> delivered. I specialize in creating <strong>SEO-optimized, W3-validated, and fully responsive</strong> digital platforms.
            </p>
          </section>

          <section className={styles.techStack}>
            <div>
              <h4>Programming language</h4>
              <p>HTML & CSS</p>
            </div>
            <div>
              <h4>Expertise</h4>
              <p>Algorithms & Data structures, Debugging, Performance, Design, Source control</p>
            </div>
            <div>
              <h4>Frontend framework</h4>
              <p>React.js, Bootstrap, Semantic-UI, Tailwind CSS</p>
            </div>
            <div>
              <h4>Backend framework</h4>
              <p>Django, Express.js, Node.js, Next.js</p>
            </div>
          </section>

          <section className={styles.packageComparison}>
  <h2>Compare packages</h2>
  <div className={styles.packageTable}>
    <div className={`${styles.row} ${styles.headerRow}`}>
      <div className={styles.cellSpecial}>Package</div>
      <div className={styles.cell}>
        <span className="pricingTitleInPackage">PKR 4,439</span><br />
        <span className={styles.packageTitle}>GOLD</span><br />
        <span className={styles.packageDesc}>1 page max 5 Sections + Responsive *no animations included</span>
      </div>
      <div className={styles.cell}>
        <span className="pricingTitleInPackage">PKR 8,878</span><br />
        <span className={styles.packageTitle}>DIMOND</span><br />
        <span className={styles.packageDesc}>1 page max 8 Sections + counter + slider + basic animations</span>
      </div>
      <div className={styles.cell}>
        <span className="pricingTitleInPackage">PKR 17,755</span><br />
        <span className={styles.packageTitle}>PLATINUM</span><br />
        <span className={styles.packageDesc}>1 page as many sections need + counter + slider + reviews + contact form + map + animations & effect</span>
      </div>
    </div>

    <div className={styles.row}>
      <div className={styles.cell}>Design customization</div>
      <div className={styles.cell}>✔</div>
      <div className={styles.cell}>✔</div>
      <div className={styles.cell}>✔</div>
    </div>
    <div className={styles.row}>
      <div className={styles.cell}>Content upload</div>
      <div className={styles.cell}></div>
      <div className={styles.cell}>✔</div>
      <div className={styles.cell}>✔</div>
    </div>
    <div className={styles.row}>
      <div className={styles.cell}>Responsive design</div>
      <div className={styles.cell}>✔</div>
      <div className={styles.cell}>✔</div>
      <div className={styles.cell}>✔</div>
    </div>
    <div className={styles.row}>
      <div className={styles.cell}>Include source code</div>
      <div className={styles.cell}>✔</div>
      <div className={styles.cell}>✔</div>
      <div className={styles.cell}>✔</div>
    </div>
    <div className={styles.row}>
      <div className={styles.cell}>Detailed code comments</div>
      <div className={styles.cell}>✔</div>
      <div className={styles.cell}>✔</div>
      <div className={styles.cell}>✔</div>
    </div>
  </div>
</section>
<section className={styles.reviewsSection}>
  <h2>Reviews</h2>

  <div className={styles.reviewSummary}>
    <div className={styles.leftStats}>
      <p><strong>37 reviews for this Gig</strong></p>
      <div className={styles.ratingRow}><span>5 Stars</span><div className={styles.bar}><div className={styles.filled} style={{width: '97%'}}></div></div><span>(36)</span></div>
      <div className={styles.ratingRow}><span>4 Stars</span><div className={styles.bar}><div className={styles.filled} style={{width: '3%'}}></div></div><span>(1)</span></div>
      <div className={styles.ratingRow}><span>3 Stars</span><div className={styles.bar}></div><span>(0)</span></div>
      <div className={styles.ratingRow}><span>2 Stars</span><div className={styles.bar}></div><span>(0)</span></div>
      <div className={styles.ratingRow}><span>1 Star</span><div className={styles.bar}></div><span>(0)</span></div>
    </div>

    <div className={styles.rightStats}>
      <div className={styles.totalStars}>
        <span>★★★★★</span> <strong>5.0</strong>
      </div>
      <div className={styles.breakdown}>
  <div className={styles.breakdownRow}>
    <span>Seller communication level</span>
    <span>★ 5</span>
  </div>
  <div className={styles.breakdownRow}>
    <span>Quality of delivery</span>
    <span>★ 4.9</span>
  </div>
  <div className={styles.breakdownRow}>
    <span>Value of delivery</span>
    <span>★ 4.9</span>
  </div>
</div>

    </div>
  </div>

  <div className={styles.reviewFilters}>
    <input type="text" placeholder="Search reviews" />
    <button>🔍</button>
    <select>
      <option>Most relevant</option>
    </select>
   </div>

  <div className={styles.reviewCard}>
    <div className={styles.userInfo}>
      <img src="/assets/gigs/avatar.png" alt="avatar" />
      <div>
        <strong>omega_web_inv</strong>
        <div className={styles.location}>🇺🇸 United States</div>
      </div>
    </div>
    <div className={styles.stars}>★★★★★ <span>5</span> • 2 weeks ago</div>
    <p>
      This was for a personal portfolio and I love the way it came out. He explained everything he was going to do and went above and beyond. I highly recommend this freelancer.
    </p>
  </div>

  <div className={styles.messageOverlay}>
    <img src="/assets/gigs/avatar.png" alt="Profile" />
    <div>
      <strong>Message Hossain Rabbi</strong><br />
      <span>Away • Avg. response time: 1 Hour</span>
    </div>
  </div>
</section>

        </div>

    <div className={styles.packageCard}>
      <div className={styles.tabs}>
        <span>Basic</span>
        <span>Standard</span>
        <span className={styles.active}>Premium</span>
      </div>
<div className={styles.packageCardPadded}>
      <div className={styles.price}>$165</div>

      <p className={styles.subscription}>
        Save up to 20% with <span className={styles.subscribeLink}>Subscribe to Save</span>
      </p>

      <p className={styles.desc}>
        <strong>Mountain Package – For Pros !</strong> 5 Highly Professional
        variations JPEG PNG + STATIONARY & SOCIAL MEDIA DESIGN + Source files for logo
      </p>

      <div className={styles.meta}>
        <span>⏱ 3 Days Delivery</span>
        <span>⟳ Unlimited Revisions</span>
      </div>

      <div className={styles.included}>
        <span>What's Included</span>
        <span>▾</span>
      </div>

      <button className={styles.continueBtn}>Continue →</button>

      <p className={styles.compare}>Compare Packages</p>

      <button className={styles.contactBtn}>Contact Seller</button>
    </div>
      </div></div>
    </div>
  );
};

export default GigDetails;
