import { CyclePeriodType, EvalType, QuestionType } from '@prisma/client'
import prisma from '$lib/prisma'

const main = async () => {
  await prisma.user.create({
    data: {
      givenName: 'Juan',
      familyName: 'Dela Cruz',
      email: 'juan@email.com',
      password: 'password',
      address: '123 Street, City, Province',
      phone: '09123456789'
    }
  })

  const cycle = await prisma.cycle.create({
    data: {
      month: 11,
      year: 2024
    }
  })

  const seminars: { title: string; course: string; description: string }[] = [
    {
      title: 'Literacy',
      course: 'Education',
      description: ''
    },
    {
      title: 'Bakes and Pastries',
      course: 'Food Technology',
      description: ''
    },
    {
      title: 'Fisheries Management',
      course: 'Fisheries',
      description: ''
    },
    {
      title: 'Electronic Spreadsheet',
      course: 'Computer Science',
      description: ''
    },
    {
      title: 'Self-Defense',
      course: 'Criminology',
      description: ''
    }
  ]

  const questionsData = [
    [
      {
        title: 'Ano ang pinakamalawak na kahulugan ng literacy?',
        options: [
          { label: 'Kakayahang magsulat lamang', isCorrect: false },
          {
            label: 'Kakayahang magbasa, magsulat, at makaunawa',
            isCorrect: true
          },
          { label: 'Kakayahang magturo', isCorrect: false },
          { label: 'Kakayahang makinig', isCorrect: false }
        ]
      },
      {
        title:
          'Ano ang pangunahing benepisyo ng pagkakaroon ng mataas na literacy rate?',
        options: [
          { label: 'Mas maraming panahon sa paglalaro', isCorrect: false },
          { label: 'Mas malaking kita sa trabaho', isCorrect: false },
          {
            label: 'Mas malawak na oportunidad sa edukasyon at trabaho',
            isCorrect: true
          },
          { label: 'Mas maraming oras sa pakikipagkaibigan', isCorrect: false }
        ]
      }
    ],
    [
      {
        title: 'What are the basic ingredients in bread making?',
        options: [
          { label: 'Flour, water, yeast, and sugar', isCorrect: false },
          { label: 'Flour, water, yeast, and salt', isCorrect: true },
          { label: 'Flour, butter, yeast, and salt', isCorrect: false },
          { label: 'Flour, eggs, water, and salt', isCorrect: false }
        ]
      },
      {
        title: 'What is gluten, and why is it important in bread making?',
        options: [
          { label: 'A type of starch that helps bread rise', isCorrect: false },
          { label: 'A sugar that adds sweetness to bread', isCorrect: false },
          {
            label: 'A protein that gives bread its structure and elasticity',
            isCorrect: true
          },
          { label: 'A fat that makes bread soft', isCorrect: false }
        ]
      },
      {
        title: 'What does "proofing" mean in bread making?',
        options: [
          { label: 'Baking the bread at a low temperature', isCorrect: false },
          {
            label: 'Letting the dough rest to develop flavor',
            isCorrect: false
          },
          {
            label: 'Allowing the dough to rise before baking',
            isCorrect: true
          },
          { label: 'Mixing the ingredients slowly', isCorrect: false }
        ]
      },
      {
        title: 'What type of yeast is most commonly used in baking?',
        options: [
          { label: 'Fresh yeast', isCorrect: false },
          { label: 'Wild yeast', isCorrect: false },
          { label: 'Active dry yeast and instant yeast', isCorrect: true },
          { label: 'Liquid yeast', isCorrect: false }
        ]
      }
    ],
    [
      {
        title: 'Where does red tide occur?',
        options: [
          { label: 'in land', isCorrect: false },
          { label: 'in air', isCorrect: false },
          { label: 'in sea', isCorrect: true }
        ]
      },
      {
        title: 'What cause red tide?',
        options: [
          { label: 'bacteria', isCorrect: false },
          { label: 'algae', isCorrect: true },
          { label: 'virus', isCorrect: false }
        ]
      },
      {
        title: 'What is the other term for red tide?',
        options: [
          { label: 'harmful tide', isCorrect: false },
          { label: 'harmful algal bloom', isCorrect: true },
          { label: 'strangers tide', isCorrect: false }
        ]
      }
    ],
    [
      {
        title: 'The number of rows in a worksheet is',
        options: [
          { label: '36500', isCorrect: false },
          { label: '5536', isCorrect: true },
          { label: '256', isCorrect: false }
        ]
      },
      {
        title:
          'When a formatted number does not fit within a cell, it displays"',
        options: [
          { label: '#####', isCorrect: true },
          { label: '#DIV/0', isCorrect: false },
          { label: '#DIV@', isCorrect: false }
        ]
      },
      {
        title: 'What is the other term for red tide?',
        options: [
          { label: 'harmful tide', isCorrect: true },
          { label: 'harmful algal bloom', isCorrect: false },
          { label: 'strangers tide', isCorrect: false }
        ]
      }
    ],
    [
      {
        title: 'What is the primary goal of self-defense?',
        options: [
          { label: 'To hurt the attacker', isCorrect: false },
          {
            label: 'To protect yourself and escape from harm',
            isCorrect: true
          },
          { label: 'To win a fight', isCorrect: false }
        ]
      },
      {
        title: 'What is the most vulnerable part of an attackers body?',
        options: [
          { label: 'arms', isCorrect: false },
          { label: 'legs', isCorrect: false },
          { label: 'shoulders', isCorrect: true }
        ]
      },
      {
        title: 'What should you do if someone grabs your wrist?',
        options: [
          { label: 'Try to overpower them', isCorrect: false },
          { label: 'Pull your hand directly away from them', isCorrect: false },
          {
            label:
              'Rotate your wrist towards the attackers thumb and pull away',
            isCorrect: true
          }
        ]
      }
    ]
  ]

  for (let i = 0; i < seminars.length; i++) {
    const seminar = await prisma.seminar.create({
      data: {
        title: seminars[i].title,
        course: seminars[i].course,
        description: seminars[i].description,
        cycleId: cycle.id
      }
    })

    for (const questionData of questionsData[i]) {
      await prisma.question.create({
        data: {
          title: questionData.title,
          type: QuestionType.MULTIPLE_CHOICE,
          seminarId: seminar.id,
          options: {
            create: questionData.options
          }
        }
      })
    }
  }

  await prisma.cyclePeriod.create({
    data: {
      cycleId: cycle.id,
      currentPeriod: CyclePeriodType.EVAL,
      startedAt: new Date()
    }
  })

  type Evaluation = {
    title: string
    type: EvalType
    questions: string[]
  }

  const evaluations: Evaluation[] = [
    {
      title: 'The Topic',
      questions: [
        'Nagakaigo gid ang topiko sa akon nga kinahanglan sa pangabuhi o trabaho.',
        'Ang pagpasunod sang topiko mayo kag may yara nga sistema.',
        'Ang presentasyon o demo nga gipakita nagasunod sa tinutuyo sang training.',
        'Nagahatag sang oportunidad nga makapamangkot para nga mas maintindihan.'
      ],
      type: 'RATING'
    },
    {
      title: 'The Trainer',
      questions: [
        'Gapakita sang iya nahibal-an sa topiko.',
        'Sigurado siya nga matuod kag mapatihad ang iya ginasaysay nga impormasyon.',
        'Matawhay ang pagpasunod sang iya topiko agud madali maintindihan.',
        'Maayo siya magsaysay kag walagautay utay ang iya paghambal.',
        'Makasabat siya sang pamangkot kag mapaintindi ang iya sabat sa tagpamalati.',
        'Nagatahag sang inspirasyon sa tagpamalati agud nga mangin interesado sa topiko.'
      ],
      type: 'RATING'
    },
    {
      title: 'The Facilitators',
      questions: [
        'Nagapakita sang ila propesyonalismo sa ila nga pagbulig sa training o seminar.',
        'Matinahuron, pasensyoso kag mabinuligon sa mga nagabuylog sang paghanas.',
        'Nagahatag sang matawhay kag maayo nga lugar para sa pagtuon sang bag-o nga impormasyon.',
        'Ginamanehar ang bilog nga grupo agud nga matawhay ang dalagan sang training.'
      ],
      type: 'RATING'
    },
    {
      title: ' The Accomodation and Food',
      questions: [
        'Maayo ang kalidad kag masustansya ang ila nga ginhatag nga pagkaon.',
        'Ang pag-amuma nagahatag sa mga nagabuylog sang training sang katawhay.',
        'Nagakaigo kag matawhay ang lugar nga ginhiwatan sang training. (Wala sang butang nga makadisturbo sa atensyon sang mga partisipante.)'
      ],
      type: 'RATING'
    },
    {
      title: 'General Satisfaction',
      questions: [
        'Ini nga training nakapasar gid sa akon nga ekspektasyon.',
        'Ini nga training isa sa mga manami nga training nga akon nasaksihan.',
        'Ginbag-o sang training nga ini ang akon nabal-an kag padayunon ko ang ginahimo.'
      ],
      type: 'RATING'
    },
    {
      title: 'Feedback',
      questions: [
        'Ano gid ang imo nagustuhan nga parte sa paghanas?',
        'Ano pa gid ang imo gusto nga mayo nga idugang parte sa amon paghanas?'
      ],
      type: 'FEEDBACK'
    }
  ]

  for (let i = 0; i < evaluations.length; i++) {
    const evaluation = await prisma.eval.create({
      data: {
        title: evaluations[i].title,
        type: evaluations[i].type
      }
    })
    for (let j = 0; j < evaluations[i].questions.length; j++) {
      await prisma.evalQuestion.create({
        data: {
          question: evaluations[i].questions[j],
          evalId: evaluation.id
        }
      })
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    await prisma.$disconnect()
    console.error(error)
    process.exit(1)
  })
