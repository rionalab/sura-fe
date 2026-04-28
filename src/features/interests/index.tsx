'use client'

import {
   ArrowRightOutlined,
   BankOutlined,
   CodeOutlined,
   CompassOutlined,
   CustomerServiceOutlined,
   MedicineBoxOutlined,
   PlayCircleOutlined,
   ReadOutlined,
   RocketOutlined,
   UserOutlined,
   TrophyOutlined,
   VideoCameraOutlined,
} from '@ant-design/icons'
import { Button, Checkbox } from 'antd'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './styles.module.scss'

const INTERESTS = [
   {
      name: 'Teknologi',
      people: 12840,
      Icon: CodeOutlined,
      tone: 'toneTech',
   },
   {
      name: 'Bisnis',
      people: 9360,
      Icon: BankOutlined,
      tone: 'toneBusiness',
   },
   {
      name: 'Pendidikan',
      people: 11290,
      Icon: ReadOutlined,
      tone: 'toneEducation',
   },
   {
      name: 'Kesehatan',
      people: 8750,
      Icon: MedicineBoxOutlined,
      tone: 'toneHealth',
   },
   {
      name: 'Musik',
      people: 15420,
      Icon: CustomerServiceOutlined,
      tone: 'toneMusic',
   },
   {
      name: 'Film',
      people: 14780,
      Icon: VideoCameraOutlined,
      tone: 'toneFilm',
   },
   {
      name: 'Olahraga',
      people: 10220,
      Icon: TrophyOutlined,
      tone: 'toneSport',
   },
   {
      name: 'Travel',
      people: 11950,
      Icon: CompassOutlined,
      tone: 'toneTravel',
   },
   {
      name: 'Game',
      people: 17360,
      Icon: PlayCircleOutlined,
      tone: 'toneGame',
   },
   {
      name: 'Lifestyle',
      people: 13110,
      Icon: RocketOutlined,
      tone: 'toneLifestyle',
   },
]

export function InterestPage() {
   const router = useRouter()
   const [selected, setSelected] = useState<string[]>([])
   const allSelected = selected.length === INTERESTS.length

   const toggleInterest = (interest: string) => {
      setSelected((current) =>
         current.includes(interest)
            ? current.filter((item) => item !== interest)
            : [...current, interest]
      )
   }

   const toggleAll = () => {
      setSelected(allSelected ? [] : INTERESTS.map((interest) => interest.name))
   }

   return (
      <main className={styles.root}>
         <section className={styles.content}>
            <div className={styles.header}>
               <div className={styles.brand}>
                  <span className={styles.brandMark}>S</span>
                  <span>Suraelle</span>
               </div>

               <div>
                  <h1>Pilih minatmu</h1>
                  <p className={styles.description}>
                     Ini membantu Sura menyiapkan obrolan yang lebih relevan.
                  </p>
                  <br />
               </div>
            </div>

            <div className={styles.grid}>
               {INTERESTS.map((interest) => {
                  const isSelected = selected.includes(interest.name)
                  const InterestIcon = interest.Icon

                  return (
                     <button
                        key={interest.name}
                        className={`${styles.interestButton} ${
                           isSelected ? styles.selected : ''
                        } ${styles[interest.tone]}`}
                        onClick={() => toggleInterest(interest.name)}
                        type="button"
                     >
                        <span className={styles.iconBox}>
                           <InterestIcon />
                        </span>

                        <strong>{interest.name}</strong>

                        <span className={styles.people}>
                           <UserOutlined />
                           &nbsp;&nbsp;
                           {interest.people.toLocaleString('id-ID')}
                        </span>
                     </button>
                  )
               })}
            </div>
            <br />
            <div className={styles.selectAll}>
               <Checkbox
                  checked={allSelected}
                  indeterminate={selected.length > 0 && !allSelected}
                  onChange={toggleAll}
               >
                  Pilih semua
               </Checkbox>

               <span>
                  {selected.length} dari {INTERESTS.length} dipilih
               </span>
            </div>

            <div className={styles.footer}>
               <span>Pilih minimal satu minat untuk lanjut.</span>
               <Button
                  className={styles.nextButton}
                  disabled={selected.length === 0}
                  icon={<ArrowRightOutlined />}
                  onClick={() => router.push('/chat')}
                  size="large"
                  iconPlacement="end"
                  shape="round"
                  variant="solid"
                  color="default"
               >
                  Selanjutnya
               </Button>
            </div>
         </section>
      </main>
   )
}
