import { Link } from 'react-router-dom'
import { books } from '../../data/books'
import BookCard from '../../components/BookCard/BookCard'
import styles from './Home.module.scss'

const Home = () => {
  const featured = books.slice(0, 4)

  return (
    <div className={styles.home}>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <span className={styles.tag}>📚 Biznes kitoblar olami</span>
          <h1>
            Bilim — eng yaxshi
            <span> investitsiya!</span>
          </h1>
          <p>
            O'zingizga kerakli kitobni toping, buyurtma bering —
            biz tez va qulay yetkazib beramiz!
          </p>
          <div className={styles.heroBtns}>
            <Link to="/catalog" className={styles.btnPrimary}>
              Kitoblarni ko'rish
            </Link>
            <Link to="/catalog" className={styles.btnSecondary}>
              Kategoriyalar
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <strong>500+</strong>
              <span>Kitob</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.stat}>
              <strong>1000+</strong>
              <span>Mijoz</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.stat}>
              <strong>24/7</strong>
              <span>Yetkazish</span>
            </div>
          </div>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.heroCard}>
            <div className={styles.heroCardInner}>
              <span>📚</span>
              <p>Najot Book</p>
              <small>Biznes kitoblar olami</small>
            </div>
          </div>
          <div className={styles.floatCard1}>
            <span>🚀</span> Tez yetkazish
          </div>
          <div className={styles.floatCard2}>
            <span>⭐</span> 5.0 Reyting
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className={styles.features}>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>🚀</div>
          <h3>Tez yetkazish</h3>
          <p>Buyurtma bergan kuningiz yetkazib beramiz</p>
        </div>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>💳</div>
          <h3>Qulay to'lov</h3>
          <p>Karta orqali yoki naqd pul bilan to'lang</p>
        </div>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>📖</div>
          <h3>Keng tanlov</h3>
          <p>Biznes, diniy, badiiy va bolalar kitoblari</p>
        </div>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>🔒</div>
          <h3>Ishonchli</h3>
          <p>100% sifatli va original kitoblar</p>
        </div>
      </section>

      {/* FEATURED BOOKS */}
      <section className={styles.section}>
        <div className={styles.sectionTop}>
          <div>
            <h2>Mashhur kitoblar</h2>
            <p>Eng ko'p sotib olingan kitoblar</p>
          </div>
          <Link to="/catalog" className={styles.seeAll}>
            Barchasini ko'rish →
          </Link>
        </div>
        <div className={styles.booksGrid}>
          {featured.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className={styles.section}>
        <div className={styles.sectionTop}>
          <div>
            <h2>Kategoriyalar</h2>
            <p>O'zingizga mos kategoriyani tanlang</p>
          </div>
        </div>
        <div className={styles.catGrid}>
          <Link to="/catalog" className={styles.catCard}>
            <span>💼</span>
            <h3>Biznes</h3>
            <p>Moliya, marketing, menejment</p>
          </Link>
          <Link to="/catalog" className={styles.catCard}>
            <span>🕌</span>
            <h3>Diniy</h3>
            <p>Islom, tarix, ma'rifat</p>
          </Link>
          <Link to="/catalog" className={styles.catCard}>
            <span>📝</span>
            <h3>Badiiy</h3>
            <p>Roman, hikoya, she'riyat</p>
          </Link>
          <Link to="/catalog" className={styles.catCard}>
            <span>🧸</span>
            <h3>Ertaklar</h3>
            <p>Bolalar uchun qiziqarli ertaklar</p>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <h2>Kitob buyurtma qiling!</h2>
        <p>Tez va qulay yetkazib beramiz. Hoziroq boshlang!</p>
        <Link to="/catalog" className={styles.btnPrimary}>
          Xarid qilish
        </Link>
      </section>

    </div>
  )
}

export default Home