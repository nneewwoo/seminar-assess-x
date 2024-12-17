type Evaluation = {
  category: string
  evalType: 'rating' | 'feedback'
  questions: string[]
}

const evaluation: Evaluation[] = [
  {
    category: 'Topiko',
    questions: [
      'Nagakaigo gid ang topiko sa akon nga kinahanglan sa pangabuhi o trabaho.',
      'Ang pagpasunod sang topiko mayo kag may yara nga sistema.',
      'Ang presentasyon o demo nga gipakita nagasunod sa tinutuyo sang training.',
      'Nagahatag sang oportunidad nga makapamangkot para nga mas maintindihan.'
    ],
    evalType: 'rating'
  },
  {
    category: 'Ang manugtdulo/manughunas',
    questions: [
      'Gapakita sang iya nahibal-an sa topiko.',
      'Sigurado siya nga matuod kag mapatihad ang iya ginasaysay nga impormasyon.',
      'Matawhay ang pagpasunod sang iya topiko agud madali maintindihan.',
      'Maayo siya magsaysay kag walagautay utay ang iya paghambal.',
      'Makasabat siya sang pamangkot kag mapaintindi ang iya sabat sa tagpamalati.',
      'Nagatahag sang inspirasyon sa tagpamalati agud nga mangin interesado sa topiko.'
    ],
    evalType: 'rating'
  },
  {
    category: 'Facilitator',
    questions: [
      'Nagapakita sang ila propesyonalismo sa ila nga pagbulig sa training o seminar.',
      'Matinahuron, pasensyoso kag mabinuligon sa mga nagabuylog sang paghanas.',
      'Nagahatag sang matawhay kag maayo nga lugar para sa pagtuon sang bag-o nga impormasyon.',
      'Ginamanehar ang bilog nga grupo agud nga matawhay ang dalagan sang training.'
    ],
    evalType: 'rating'
  },
  {
    category: 'Accomodation and Food',
    questions: [
      'Maayo ang kalidad kag masustansya ang ila nga ginhatag nga pagkaon.',
      'Ang pag-amuma nagahatag sa mga nagabuylog sang training sang katawhay.',
      'Nagakaigo kag matawhay ang lugar nga ginhiwatan sang training. (Wala sang butang nga makadisturbo sa atensyon sang mga partisipante.)'
    ],
    evalType: 'rating'
  },
  {
    category:
      'Gilayon nga pag aksyon sang ginahinyo nga paghanas (General Satisfaction)',
    questions: [
      'Ini nga training nakapasar gid sa akon nga ekspektasyon.',
      'Ini nga training isa sa mga manami nga training nga akon nasaksihan.',
      'Ginbag-o sang training nga ini ang akon nabal-an kag padayunon ko ang ginahimo.'
    ],
    evalType: 'rating'
  },
  {
    category: 'Feedback',
    questions: [
      'Ano gid ang imo nagustuhan nga parte sa paghanas?',
      'Ano pa gid ang imo gusto nga mayo nga idugang parte sa amon paghanas?'
    ],
    evalType: 'feedback'
  }
]

export default evaluation
