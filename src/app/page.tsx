'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  Flame,
  Heart,
  Bug,
  Hand,
  DoorOpen,
  Package,
  Utensils,
  ChevronDown,
  Leaf,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Reusable components                                                */
/* ------------------------------------------------------------------ */

function SectionTitle({
  title,
  subtitle,
  light = false,
}: {
  title: string
  subtitle: string
  light?: boolean
}) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide ${
          light ? 'text-white' : 'text-[#2c3e2d]'
        }`}
      >
        {title}
      </motion.h2>
      <div className="divider-ornament my-4">
        <span className="text-[#c9a96e] text-xl">◆</span>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className={`text-base md:text-lg tracking-widest ${
          light ? 'text-white/80' : 'text-[#4a7c59]'
        }`}
      >
        {subtitle}
      </motion.p>
    </div>
  )
}

function FloatingLeaves() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="animate-float-leaf absolute text-[#4a7c59]/10"
          style={{
            left: `${10 + i * 12}%`,
            animationDuration: `${12 + i * 3}s`,
            animationDelay: `${i * 2}s`,
            fontSize: `${14 + i * 3}px`,
          }}
        >
          🍃
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Hero Section                                                       */
/* ------------------------------------------------------------------ */

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-screen min-h-[600px] w-full overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src="/images/hero_mugwort.png"
          alt="艾草 · 云雾山间的翠绿艾草"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </motion.div>

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

      {/* Content */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="animate-subtle-float"
        >
          <h1 className="mb-4 text-6xl font-bold tracking-[0.2em] text-white drop-shadow-lg md:text-8xl lg:text-9xl">
            艾草
          </h1>
          <div className="mx-auto mb-8 h-[2px] w-32 bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent" />
          <p className="mb-2 text-lg tracking-[0.3em] text-[#7bae7f] md:text-2xl">
            千年药草 · 百草之王
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-6 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base lg:text-lg"
        >
          一株艾草，承载千年医药智慧；一缕艾烟，传承中华文明血脉
        </motion.p>

        {/* Scroll indicator */}
        <motion.a
          href="#history"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-16 flex flex-col items-center gap-2 text-white/60 transition-colors hover:text-white/90"
          aria-label="向下滚动"
        >
          <span className="text-xs tracking-widest">探索更多</span>
          <ChevronDown className="h-6 w-6 animate-bounce-slow" />
        </motion.a>
      </motion.div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  历史渊源 Section                                                    */
/* ------------------------------------------------------------------ */

const timelineData = [
  {
    era: '西周',
    text: '《诗经》记载"采艾"',
    detail: '诗经·王风中有"彼采艾兮"的诗句，是迄今所知关于艾草最早的文字记载。',
  },
  {
    era: '秦汉',
    text: '《五十二病方》艾草入药',
    detail: '马王堆汉墓出土的《五十二病方》中已有艾草入药的详细记载，距今两千余年。',
  },
  {
    era: '东汉',
    text: '张仲景《伤寒论》艾叶方剂',
    detail: '医圣张仲景在《伤寒论》与《金匮要略》中创制多首以艾叶为主药的方剂，如胶艾汤。',
  },
  {
    era: '明代',
    text: '李时珍《本草纲目》详述艾草',
    detail: '李时珍对艾草进行了最为系统的总结，详述其形态、产地、采收与药效，推蕲艾为上品。',
  },
]

function HistorySection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="history"
      ref={sectionRef}
      className="relative bg-[#faf8f5] py-20 md:py-28"
    >
      <FloatingLeaves />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="历史渊源" subtitle="穿越千年的药草传奇" />

        {/* Top content + image */}
        <div className="mb-16 flex flex-col items-center gap-10 lg:flex-row">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="flex-1 space-y-5 text-base leading-relaxed text-[#2c3e2d]/85 md:text-lg"
          >
            <p>
              艾草在中国有数千年使用历史，早在《诗经》中就有"采艾"的记载。
            </p>
            <p>
              马王堆汉墓出土的《五十二病方》中已有艾草入药的记载，距今已有两千多年。
            </p>
            <p>
              《黄帝内经》中将艾草列为重要药材，"灸"法以艾为最佳材料。
            </p>
            <p>
              历代医家对艾草推崇备至，称其为"百草之王"。
            </p>

            <div className="ancient-quote mt-6">
              <p className="text-[#4a7c59]">
                艾叶取太阳真火，可以回垂绝元阳。
              </p>
              <p className="mt-1 text-right text-sm text-[#4a7c59]/70">
                —— 李时珍《本草纲目》
              </p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex-1"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/history_mugwort.png"
                alt="古代中医药场景"
                width={1152}
                height={864}
                className="w-full object-cover"
                unoptimized
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                <p className="text-sm text-white/90">古代中医药场景</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="relative ml-4 md:ml-10"
        >
          <div className="timeline-line" />
          <div className="space-y-10 pb-2">
            {timelineData.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function TimelineItem({
  item,
  index,
}: {
  item: { era: string; text: string; detail: string }
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="relative pl-12 md:pl-16">
      <div className="timeline-dot" style={{ top: 6 }} />
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.12 }}
      >
        <span className="inline-block rounded-full bg-[#4a7c59] px-3 py-1 text-xs font-semibold text-white md:text-sm">
          {item.era}
        </span>
        <h3 className="mt-2 text-lg font-semibold text-[#2c3e2d] md:text-xl">
          {item.text}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-[#2c3e2d]/70 md:text-base">
          {item.detail}
        </p>
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  药用价值 Section                                                    */
/* ------------------------------------------------------------------ */

const medicineData = [
  {
    icon: Flame,
    title: '艾灸疗法',
    image: '/images/moxibustion.png',
    imageAlt: '艾灸疗法',
    desc: '艾灸是中医最古老的外治法之一，通过点燃艾条或艾炷，熏灼体表穴位，借助灸火的热力及药物作用，温通经络、调和气血、祛湿散寒。现代研究证实，艾灸可通过热刺激和艾草挥发油的药理作用，调节免疫系统功能。',
  },
  {
    icon: Heart,
    title: '温经散寒',
    image: '/images/mugwort_footbath.png',
    imageAlt: '艾草足浴',
    desc: '艾草性温，味苦辛，归肝、脾、肾经。具有温经止血、散寒止痛之功效。常用于治疗虚寒性出血、腹痛、痛经等症。古方"胶艾汤"即以艾叶为主药，治疗妇女崩漏下血。',
  },
  {
    icon: Bug,
    title: '驱蚊防虫',
    image: '/images/moxibustion.png',
    imageAlt: '艾草驱虫',
    desc: '艾草含有大量挥发油，主要成分为桉油精、樟脑、龙脑等，具有显著的驱虫效果。燃烧艾叶可驱蚊蝇，民间自古就有端午燃艾驱虫的习俗。现代研究证实艾草提取物对多种害虫有驱避作用。',
  },
  {
    icon: Hand,
    title: '外用消肿',
    image: '/images/mugwort_footbath.png',
    imageAlt: '艾草外用',
    desc: '艾草煎水外洗可治疗湿疹、皮肤瘙痒等症。艾叶灰具有收敛止血、燥湿敛疮的作用，可用于外伤出血和疮疡不敛。民间常用艾草煮水泡脚，具有温经散寒、改善血液循环的功效。',
  },
]

function MedicineSection() {
  return (
    <section id="medicine" className="relative bg-white py-20 md:py-28">
      <FloatingLeaves />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="药用价值" subtitle="百草之王的医药智慧" />

        <div className="grid gap-6 sm:grid-cols-2">
          {medicineData.map((item, i) => (
            <MedicineCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function MedicineCard({
  item,
  index,
}: {
  item: {
    icon: React.ComponentType<{ className?: string }>
    title: string
    image: string
    imageAlt: string
    desc: string
  }
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const Icon = item.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="mugwort-card group overflow-hidden rounded-2xl border border-[#4a7c59]/10 bg-[#faf8f5] shadow-sm"
    >
      {/* Card image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2d5a3f]/60 to-transparent" />
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4a7c59] text-white shadow-md">
            <Icon className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-bold text-white drop-shadow">{item.title}</h3>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 md:p-6">
        <p className="text-sm leading-relaxed text-[#2c3e2d]/80 md:text-base">
          {item.desc}
        </p>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  治病故事 Section                                                    */
/* ------------------------------------------------------------------ */

const storyData = [
  {
    title: '李时珍与艾草',
    image: '/images/li_shizhen.png',
    imageAlt: '李时珍编纂《本草纲目》',
    desc: '明代医药学家李时珍在《本草纲目》中对艾草有详细论述，称"艾叶取太阳真火，可以回垂绝元阳"。他亲自上山采艾，考证艾草的形态、产地与药效，纠正了前人诸多谬误。李时珍发现蕲州所产艾草品质最优，后世称"蕲艾"，成为道地药材。',
    quote: '艾叶取太阳真火，可以回垂绝元阳。服之走三阴，而逐一切寒湿，转肃杀之气为融和。',
  },
  {
    title: '华佗艾灸救难',
    image: '/images/moxibustion.png',
    imageAlt: '华佗艾灸',
    desc: '传说东汉名医华佗善用艾灸救治危急病人。一次，一位产妇难产昏迷，华佗以艾灸熏灼关元、气海等穴位，温通经络，不久产妇苏醒顺利生产。此故事流传至今，艾灸温阳救逆的功效被后世医家奉为经典。',
    quote: '艾灸温阳救逆，回阳固脱，乃急救之要法也。',
  },
  {
    title: '葛洪与艾草防疫',
    image: '/images/history_mugwort.png',
    imageAlt: '葛洪与艾草防疫',
    desc: '东晋医学家葛洪在《肘后备急方》中记载了多种以艾草防治瘟疫的方法，如"断瘟病，令不相染……以艾灸床四角"等。他提出燃烧艾草烟熏消毒，可预防传染病传播，这一方法在当时救活了无数百姓，堪称中医防疫先驱。',
    quote: '断瘟病，令不相染……以艾灸床四角，佳。',
  },
]

function StoriesSection() {
  return (
    <section id="stories" className="relative bg-[#faf8f5] py-20 md:py-28">
      <FloatingLeaves />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="治病故事" subtitle="医者仁心 艾草济世" />

        <div className="space-y-16">
          {storyData.map((item, i) => (
            <StoryCard key={i} item={item} index={i} reversed={i % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StoryCard({
  item,
  index,
  reversed,
}: {
  item: { title: string; image: string; imageAlt: string; desc: string; quote: string }
  index: number
  reversed: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={`flex flex-col items-center gap-8 lg:flex-row ${
        reversed ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Image */}
      <div className="flex-1">
        <div className="relative overflow-hidden rounded-2xl shadow-xl">
          <Image
            src={item.image}
            alt={item.imageAlt}
            width={1152}
            height={864}
            className="w-full object-cover transition-transform duration-500 hover:scale-105"
            unoptimized
          />
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-1 w-8 rounded-full bg-[#c9a96e]" />
          <h3 className="text-2xl font-bold text-[#2c3e2d]">{item.title}</h3>
        </div>
        <p className="text-sm leading-relaxed text-[#2c3e2d]/80 md:text-base">
          {item.desc}
        </p>
        <div className="ancient-quote mt-4">
          <p className="text-sm text-[#4a7c59] md:text-base">{item.quote}</p>
        </div>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  文化传承 Section                                                    */
/* ------------------------------------------------------------------ */

const cultureData = [
  {
    icon: DoorOpen,
    title: '端午悬艾',
    image: '/images/duanwu_culture.png',
    imageAlt: '端午节门上悬挂艾草',
    desc: '端午节在门上悬挂艾草是中华民族最重要的传统习俗之一。古人认为五月为"毒月"，五日为"毒日"，此时正值仲夏，蚊虫滋生、疫病流行。悬挂艾草既可以驱蚊防虫，又寄托了人们辟邪祈福的美好愿望。"清明插柳，端午插艾"的谚语流传至今。',
  },
  {
    icon: Package,
    title: '艾草香囊',
    image: '/images/mugwort_sachet.png',
    imageAlt: '艾草香囊刺绣',
    desc: '佩戴艾草香囊是端午节的重要习俗。人们将艾叶与苍术、白芷、丁香等芳香药材装入精美的丝绸绣袋中，佩戴于身。香囊不仅芬芳怡人，更有驱虫辟邪、安神醒脑的功效。如今，艾草香囊已成为非物质文化遗产，其制作工艺代代相传。',
  },
  {
    icon: Utensils,
    title: '艾草饮食',
    image: '/images/mugwort_field.png',
    imageAlt: '艾草田野',
    desc: '艾草在中华饮食文化中同样占有重要地位。艾草青团是江南地区清明时节的传统美食，以鲜嫩艾叶汁与糯米粉揉制，包裹豆沙或芝麻馅料，碧绿软糯，清香怡人。此外，艾草还可制艾叶茶、艾叶粥、艾叶蛋等，既美味又养生。',
  },
]

function CultureSection() {
  return (
    <section id="culture" className="relative overflow-hidden bg-[#2d5a3f] py-20 md:py-28">
      {/* Decorative background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, #7bae7f 1px, transparent 1px), radial-gradient(circle at 80% 50%, #7bae7f 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="文化传承" subtitle="千年薪火 艾草寄情" light />

        <div className="grid gap-8 md:grid-cols-3">
          {cultureData.map((item, i) => (
            <CultureCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CultureCard({
  item,
  index,
}: {
  item: {
    icon: React.ComponentType<{ className?: string }>
    title: string
    image: string
    imageAlt: string
    desc: string
  }
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const Icon = item.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="mugwort-card group overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2d5a3f]/70 to-transparent" />
      </div>

      {/* Body */}
      <div className="p-5 md:p-6">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c9a96e] text-white">
            <Icon className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-bold text-white">{item.title}</h3>
        </div>
        <p className="text-sm leading-relaxed text-white/75 md:text-base">
          {item.desc}
        </p>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Navigation (sticky top)                                            */
/* ------------------------------------------------------------------ */

const navItems = [
  { id: 'history', label: '历史渊源' },
  { id: 'medicine', label: '药用价值' },
  { id: 'stories', label: '治病故事' },
  { id: 'culture', label: '文化传承' },
]

function StickyNav() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: -60, opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-[#4a7c59]/10 bg-white/90 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-[#4a7c59]" />
          <span className="font-bold text-[#2c3e2d]">艾草</span>
        </div>
        <div className="hidden gap-6 sm:flex">
          {navItems.map((n) => (
            <button
              key={n.id}
              onClick={() => handleClick(n.id)}
              className="text-sm text-[#2c3e2d]/70 transition-colors hover:text-[#4a7c59]"
            >
              {n.label}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="bg-[#1e3a2b] py-12 text-center">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Leaf className="h-5 w-5 text-[#7bae7f]" />
          <span className="text-lg font-semibold text-white/90">艾草</span>
        </div>
        <p className="mb-2 text-sm tracking-widest text-[#7bae7f]/80 md:text-base">
          传承千年药草智慧，守护中华文明根脉
        </p>
        <div className="mx-auto my-4 h-px w-24 bg-gradient-to-r from-transparent via-[#c9a96e]/50 to-transparent" />
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} 艾草文化传承 · 保留所有权利
        </p>
      </div>
    </footer>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <div className="min-h-screen">
      <StickyNav />
      <HeroSection />
      <HistorySection />
      <MedicineSection />
      <StoriesSection />
      <CultureSection />
      <Footer />
    </div>
  )
}
