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
  Sun,
  Sword,
  Sparkles,
  Tag,
  BookOpen,
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
          <div className="mx-auto mb-4 h-[2px] w-32 bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent" />
          <p className="mb-2 text-lg tracking-[0.3em] text-[#7bae7f] md:text-2xl">
            千年药草 · 百草之王
          </p>
          <p className="mt-2 text-sm tracking-[0.2em] text-[#c9a96e]/80 md:text-base">
            亦称冰台 · 承天火而济苍生
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
          href="#naming"
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
/*  称谓文化 Section (Naming Culture - 冰台/bingtai)                    */
/* ------------------------------------------------------------------ */

const aliasData = [
  {
    name: '冰台',
    meaning: '承冰取火',
    desc: '古人削冰为圆镜，举以向日，以艾承其影则火生，故艾得"冰台"之名。这是艾草最富诗意与哲学意味的别称——以冰之寒，引火之热，阴阳相济，化不可能为可能。',
    highlight: true,
  },
  {
    name: '医草',
    meaning: '济世之草',
    desc: '艾草自古便是中医最常用的草药之一，因疗效卓著而被尊称为"医草"。历代医家视艾为调理气血、温经散寒之要药，有"无艾不灸"之说。',
    highlight: false,
  },
  {
    name: '灸草',
    meaning: '灸法之本',
    desc: '艾草是施灸的唯一指定用草，故称"灸草"。《黄帝内经》云"针所不为，灸之所宜"，艾灸与针法并称"针灸"，成为中医最具代表性的外治法。',
    highlight: false,
  },
  {
    name: '香艾',
    meaning: '芬芳馥郁',
    desc: '艾草含有丰富挥发油，香气浓烈持久，故称"香艾"。端午时节，艾草的清香弥漫街巷，既是驱虫辟邪的实用智慧，也是中华民族独特的嗅觉记忆。',
    highlight: false,
  },
  {
    name: '蕲艾',
    meaning: '道地珍品',
    desc: '李时珍考证认定蕲州（今湖北蕲春）所产艾草品质最优，称之为"蕲艾"。蕲艾叶厚绒多、气香味浓，被视为艾中上品，至今仍为道地药材。',
    highlight: false,
  },
  {
    name: '黄草',
    meaning: '秋日金辉',
    desc: '艾草秋季枯黄后采收，植株呈金黄色，故称"黄草"。民间有"七月艾，八月蒿"的谚语，指的正是艾草由绿转黄的采收时节。',
    highlight: false,
  },
]

function NamingSection() {
  return (
    <section id="naming" className="relative overflow-hidden bg-[#2d5a3f] py-20 md:py-28">
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
        <SectionTitle title="称谓文化" subtitle="一名一义 皆为匠心" light />

        {/* 冰台 Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="mb-12 overflow-hidden rounded-3xl"
        >
          <div className="relative flex flex-col lg:flex-row">
            {/* Image side */}
            <div className="relative h-64 w-full lg:h-auto lg:w-1/2">
              <Image
                src="/images/bingtai_fire.png"
                alt="冰台取火 - 削冰令圆以艾承影"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1e3a2b]/80 lg:bg-gradient-to-l lg:from-transparent lg:to-[#1e3a2b]" />
            </div>

            {/* Text side */}
            <div className="flex-1 bg-[#1e3a2b] p-8 md:p-10 lg:p-12">
              <div className="mb-4 flex items-center gap-3">
                <Sun className="h-6 w-6 text-[#c9a96e]" />
                <span className="rounded-full bg-[#c9a96e]/20 px-3 py-1 text-xs font-semibold tracking-wider text-[#c9a96e]">
                  核心称谓
                </span>
              </div>
              <h3 className="mb-1 text-4xl font-bold tracking-wider text-white md:text-5xl">
                冰台
              </h3>
              <p className="mb-4 text-sm tracking-widest text-[#c9a96e]">BINGTAI</p>
              <p className="mb-4 text-sm leading-relaxed text-white/70 md:text-base">
                《博物志》载：&quot;削冰令圆，举而向日，以艾承其影则得火，故名冰台。&quot;古人以冰磨成凸透镜，对日聚焦引燃艾草，承接太阳真火。艾草由此得名&quot;冰台&quot;——以冰为台，承接天火。
              </p>
              <p className="mb-6 text-sm leading-relaxed text-white/70 md:text-base">
                后世又以铜制凹面镜&quot;阳燧&quot;代冰取火，但&quot;冰台&quot;之名沿袭至今。这个名字蕴含着中华先民对自然的深刻洞察：极寒之物可引极热之火，阴阳转化、相生相克，正是中医哲学的精髓。
              </p>
              <div className="ancient-quote border-l-[#c9a96e] bg-[#c9a96e]/10">
                <p className="text-[#c9a96e]">
                  削冰令圆，举而向日，以艾承其影则得火，故名冰台。
                </p>
                <p className="mt-1 text-right text-sm text-[#c9a96e]/60">
                  —— 《博物志》
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other aliases grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aliasData.filter(a => !a.highlight).map((item, i) => (
            <AliasCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function AliasCard({
  item,
  index,
}: {
  item: { name: string; meaning: string; desc: string }
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="mugwort-card rounded-2xl bg-white/10 p-5 backdrop-blur-sm md:p-6"
    >
      <div className="mb-2 flex items-baseline gap-3">
        <span className="text-2xl font-bold text-white">{item.name}</span>
        <span className="text-xs tracking-wider text-[#c9a96e]">{item.meaning}</span>
      </div>
      <p className="text-sm leading-relaxed text-white/70">{item.desc}</p>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  历史渊源 Section                                                    */
/* ------------------------------------------------------------------ */

const timelineData = [
  {
    era: '上古',
    text: '冰台取火，艾承天火',
    detail: '先民以冰透镜或阳燧聚焦日光，引燃艾草取火。艾草作为承接"天火"的媒介，在中华文明黎明之际便已登场。',
  },
  {
    era: '西周',
    text: '《诗经》记载"采艾"',
    detail: '诗经·王风中有"彼采艾兮"的诗句，是迄今所知关于艾草最早的文字记载，表明西周时艾草已进入日常生活。',
  },
  {
    era: '秦汉',
    text: '《五十二病方》艾草入药',
    detail: '马王堆汉墓出土的《五十二病方》中已有艾草入药的详细记载，涉及熏、灸、敷等多种用法，距今两千余年。',
  },
  {
    era: '东汉',
    text: '张仲景《伤寒论》艾叶方剂',
    detail: '医圣张仲景在《伤寒论》与《金匮要略》中创制多首以艾叶为主药的方剂，如胶艾汤、柏叶汤等，艾叶由此成为妇科要药。',
  },
  {
    era: '东晋',
    text: '葛洪《肘后备急方》艾草防疫',
    detail: '葛洪记载以艾烟熏消毒预防瘟疫传播，开中医防疫之先河，其法至今仍具现实意义。',
  },
  {
    era: '明代',
    text: '李时珍《本草纲目》详述艾草',
    detail: '李时珍对艾草进行了最为系统的总结，详述其形态、产地、采收与药效，推蕲艾为上品，称"艾叶取太阳真火，可以回垂绝元阳"。',
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
              艾草在中国有数千年使用历史，早在《诗经》中就有"采艾"的记载。但艾草与中华文明的交集远比文字记载更为古老——在钻木取火之前，先民便已学会以冰透镜聚焦日光、引燃艾草取火，艾草由此得名"冰台"。
            </p>
            <p>
              马王堆汉墓出土的《五十二病方》中已有艾草入药的详细记载，距今已有两千多年。此后，《黄帝内经》将艾草列为重要药材，"灸"法以艾为最佳材料，"针灸"一词由此而来。
            </p>
            <p>
              历代医家对艾草推崇备至，称其为"百草之王"。从上古取火到中医施灸，从军事寻水到端午辟邪，艾草早已超越一株草药的意义，成为中华文明不可分割的文化符号。
            </p>

            <div className="ancient-quote mt-6">
              <p className="text-[#4a7c59]">
                艾叶取太阳真火，可以回垂绝元阳。服之走三阴，而逐一切寒湿，转肃杀之气为融和。
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
        transition={{ duration: 0.5, delay: index * 0.1 }}
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
/*  奇用妙法 Section (Extraordinary Uses)                               */
/* ------------------------------------------------------------------ */

const extraordinaryData = [
  {
    icon: Sword,
    title: '行军寻水',
    image: '/images/military_water.png',
    imageAlt: '古代军队用艾草寻找水源',
    desc: '古代行军打仗，千军万马最重要的便是水源。军队每到一处安营扎寨，便四处收集艾草点燃，再将燃烧的艾草掩埋于地下。艾烟性向下走，会顺着地下缝隙弥漫，遇水则随水汽蒸腾而出。士兵只需在方圆数里内观察何处地面冒出烟气，便在该处挖掘，即可找到水源。这一方法历经千年验证，堪称古代军事智慧的经典之作。',
    quote: '艾烟入地，随水而出，掘之即得泉。',
  },
  {
    icon: Sun,
    title: '阳燧取火',
    image: '/images/yangsui_fire.png',
    imageAlt: '阳燧取火',
    desc: '古人以青铜铸造凹面镜，称"阳燧"，对日聚焦引燃艾草取火。《淮南子》载："阳燧见日，则燃而为火。"古人认为此火来自太阳，为"天火"，最为纯净神圣，祭祀、炼丹皆须用阳燧取火。艾草作为承接天火的唯一媒介，其在古人精神世界中的崇高地位可见一斑。',
    quote: '阳燧见日，则燃而为火。',
  },
  {
    icon: Sparkles,
    title: '驱邪通灵',
    image: '/images/myth_mugwort.png',
    imageAlt: '艾草驱邪通灵',
    desc: '艾草在民间信仰中被视为最具灵性的植物之一。古人认为艾草禀纯阳之气，能辟一切阴邪。道教以艾草入符、炼丹，端午悬艾更被视为驱邪护宅的第一要务。《荆楚岁时记》载："鸡未鸣时，采艾似人形者，揽而取之，收以灸病，甚验。"人形艾草更被认为具有灵性，可代受灾殃。',
    quote: '鸡未鸣时，采艾似人形者，揽而取之，收以灸病，甚验。',
  },
]

function ExtraordinarySection() {
  return (
    <section id="extraordinary" className="relative bg-white py-20 md:py-28">
      <FloatingLeaves />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="奇用妙法" subtitle="不止药草 万物皆可艾" />

        <div className="space-y-16">
          {extraordinaryData.map((item, i) => (
            <ExtraordinaryCard key={i} item={item} index={i} reversed={i % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ExtraordinaryCard({
  item,
  index,
  reversed,
}: {
  item: { icon: React.ComponentType<{ className?: string }>; title: string; image: string; imageAlt: string; desc: string; quote: string }
  index: number
  reversed: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = item.icon

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
            width={1344}
            height={768}
            className="w-full object-cover transition-transform duration-500 hover:scale-105"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4a7c59]/10">
            <Icon className="h-5 w-5 text-[#4a7c59]" />
          </div>
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
/*  药用价值 Section                                                    */
/* ------------------------------------------------------------------ */

const medicineData = [
  {
    icon: Flame,
    title: '艾灸疗法',
    image: '/images/moxibustion.png',
    imageAlt: '艾灸疗法',
    desc: '艾灸是中医最古老的外治法之一，通过点燃艾条或艾炷，熏灼体表穴位，借助灸火的热力及药物作用，温通经络、调和气血、祛湿散寒。现代研究证实，艾灸可通过热刺激和艾草挥发油的药理作用，调节免疫系统功能。正因艾烟"性向下走，能寻水湿"的特性，艾灸在体内亦可循经找病、驱寒逐湿。',
  },
  {
    icon: Heart,
    title: '温经散寒',
    image: '/images/mugwort_footbath.png',
    imageAlt: '艾草足浴',
    desc: '艾草性温，味苦辛，归肝、脾、肾经。具有温经止血、散寒止痛之功效。常用于治疗虚寒性出血、腹痛、痛经等症。古方"胶艾汤"即以艾叶为主药，治疗妇女崩漏下血，沿用至今已近两千年。民间常用艾草煮水泡脚，温经散寒、改善血液循环，正是"寒者温之"的日常践行。',
  },
  {
    icon: Bug,
    title: '驱蚊防虫',
    image: '/images/moxibustion.png',
    imageAlt: '艾草驱虫',
    desc: '艾草含有大量挥发油，主要成分为桉油精、樟脑、龙脑等，具有显著的驱虫效果。燃烧艾叶可驱蚊蝇，民间自古就有端午燃艾驱虫的习俗。现代研究证实艾草提取物对多种害虫有驱避作用，艾草驱虫也已成为天然的绿色防虫方式，既环保又安全。',
  },
  {
    icon: Hand,
    title: '外用消肿',
    image: '/images/mugwort_footbath.png',
    imageAlt: '艾草外用',
    desc: '艾草煎水外洗可治疗湿疹、皮肤瘙痒等症。艾叶灰具有收敛止血、燥湿敛疮的作用，可用于外伤出血和疮疡不敛。古人还将艾绒点燃后以"隔姜灸""隔蒜灸"等方式施治，利用艾热与药物的协同作用，直达病灶，消肿止痛，堪称中医外治的经典手法。',
  },
]

function MedicineSection() {
  return (
    <section id="medicine" className="relative bg-[#faf8f5] py-20 md:py-28">
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
      className="mugwort-card group overflow-hidden rounded-2xl border border-[#4a7c59]/10 bg-white shadow-sm"
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
    desc: '明代医药学家李时珍在《本草纲目》中对艾草有详细论述，称"艾叶取太阳真火，可以回垂绝元阳"。他亲自上山采艾，考证艾草的形态、产地与药效，纠正了前人诸多谬误。李时珍发现蕲州所产艾草品质最优，后世称"蕲艾"，成为道地药材。他在书中详细记载了艾草的数十种用法，从内服到外用、从灸法到食疗，堪称艾草知识集大成者。',
    quote: '艾叶取太阳真火，可以回垂绝元阳。服之走三阴，而逐一切寒湿，转肃杀之气为融和。',
  },
  {
    title: '华佗艾灸救难',
    image: '/images/moxibustion.png',
    imageAlt: '华佗艾灸',
    desc: '传说东汉名医华佗善用艾灸救治危急病人。一次，一位产妇难产昏迷，华佗以艾灸熏灼关元、气海等穴位，温通经络，不久产妇苏醒顺利生产。此故事流传至今，艾灸温阳救逆的功效被后世医家奉为经典。华佗还常以艾灸配合麻沸散使用，术后以艾灸促进恢复，堪称中医围手术期管理的先驱。',
    quote: '艾灸温阳救逆，回阳固脱，乃急救之要法也。',
  },
  {
    title: '葛洪与艾草防疫',
    image: '/images/history_mugwort.png',
    imageAlt: '葛洪与艾草防疫',
    desc: '东晋医学家葛洪在《肘后备急方》中记载了多种以艾草防治瘟疫的方法，如"断瘟病，令不相染……以艾灸床四角"等。他提出燃烧艾草烟熏消毒，可预防传染病传播，这一方法在当时救活了无数百姓，堪称中医防疫先驱。时至今日，艾烟杀菌消毒的功效已被现代科学证实，葛洪的智慧穿越千年依然闪耀。',
    quote: '断瘟病，令不相染……以艾灸床四角，佳。',
  },
]

function StoriesSection() {
  return (
    <section id="stories" className="relative bg-white py-20 md:py-28">
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
    desc: '端午节在门上悬挂艾草是中华民族最重要的传统习俗之一。古人认为五月为"毒月"，五日为"毒日"，此时正值仲夏，蚊虫滋生、疫病流行。悬挂艾草既可以驱蚊防虫，又寄托了人们辟邪祈福的美好愿望。"清明插柳，端午插艾"的谚语流传至今。传说唐末黄巢起义时，遇一妇人背大携小逃难，问其故，妇人称大者是邻家孤儿，小者才是己出。黄巢感其仁义，令其门前悬艾为记，军士见艾不犯。由此端午悬艾之风更盛。',
  },
  {
    icon: Package,
    title: '艾草香囊',
    image: '/images/mugwort_sachet.png',
    imageAlt: '艾草香囊刺绣',
    desc: '佩戴艾草香囊是端午节的重要习俗。人们将艾叶与苍术、白芷、丁香等芳香药材装入精美的丝绸绣袋中，佩戴于身。香囊不仅芬芳怡人，更有驱虫辟邪、安神醒脑的功效。如今，艾草香囊已成为非物质文化遗产，其制作工艺代代相传。每一只香囊都凝聚着绣娘的心意与智慧，丝线穿梭间，既有对传统的敬畏，也有对美好生活的祈愿。',
  },
  {
    icon: Utensils,
    title: '艾草饮食',
    image: '/images/mugwort_field.png',
    imageAlt: '艾草田野',
    desc: '艾草在中华饮食文化中同样占有重要地位。艾草青团是江南地区清明时节的传统美食，以鲜嫩艾叶汁与糯米粉揉制，包裹豆沙或芝麻馅料，碧绿软糯，清香怡人。此外，艾草还可制艾叶茶、艾叶粥、艾叶蛋等，既美味又养生。客家人更以艾草制作"艾粄"，作为春季时令点心，既是味蕾的享受，也是对自然馈赠的感恩。',
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
  { id: 'naming', label: '称谓文化' },
  { id: 'history', label: '历史渊源' },
  { id: 'extraordinary', label: '奇用妙法' },
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
          <span className="font-bold text-[#2c3e2d]">冰台</span>
          <span className="text-xs text-[#4a7c59]/60">bingtai</span>
        </div>
        <div className="hidden gap-4 sm:flex lg:gap-6">
          {navItems.map((n) => (
            <button
              key={n.id}
              onClick={() => handleClick(n.id)}
              className="text-xs text-[#2c3e2d]/70 transition-colors hover:text-[#4a7c59] lg:text-sm"
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
          <span className="text-lg font-semibold text-white/90">冰台</span>
          <span className="text-sm text-[#7bae7f]/60">bingtai</span>
        </div>
        <p className="mb-2 text-sm tracking-widest text-[#7bae7f]/80 md:text-base">
          传承千年药草智慧，守护中华文明根脉
        </p>
        <p className="mb-4 text-xs text-[#c9a96e]/60">
          削冰令圆，举而向日，以艾承其影则得火 —— 故名冰台
        </p>
        <div className="mx-auto my-4 h-px w-24 bg-gradient-to-r from-transparent via-[#c9a96e]/50 to-transparent" />
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} bingtai · 艾草文化传承 · 保留所有权利
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
      <NamingSection />
      <HistorySection />
      <ExtraordinarySection />
      <MedicineSection />
      <StoriesSection />
      <CultureSection />
      <Footer />
    </div>
  )
}
