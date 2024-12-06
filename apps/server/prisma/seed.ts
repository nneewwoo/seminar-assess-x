import {
  CyclePeriodType,
  ResponsePeriodType,
  QuestionType
} from '@prisma/client'
import prisma from '$lib/prisma'

async function main() {
  await prisma.user.create({
    data: {
      givenName: 'Juan',
      familyName: 'Dela Cruz',
      email: 'juandelacruz@email.com',
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

  const seminars = [
    {
      title: 'Pagpanudlo nahungod sa edukasyon (LITERACY)',
      course: 'Education'
    },
    {
      title: 'Pagpanudlo nahungod sa Bakes and Pastries',
      course: 'Food Technology'
    },
    {
      title: 'Pagpanudlo nahungod sa Fisheries Management',
      course: 'Fisheries'
    },
    {
      title: 'Pagpanudlo nahungod sa Electronic Spreadsheet',
      course: 'Computer Science'
    },
    {
      title: 'Pagpanudlo nahungod sa Self-Defense - Criminology',
      course: 'Criminology'
    }
  ]

  const questionsData = [
    [
      {
        text: 'Ano ang pinakamalawak na kahulugan ng literacy?',
        options: [
          { text: 'Kakayahang magsulat lamang', isCorrect: false },
          {
            text: 'Kakayahang magbasa, magsulat, at makaunawa',
            isCorrect: true
          },
          { text: 'Kakayahang magturo', isCorrect: false },
          { text: 'Kakayahang makinig', isCorrect: false }
        ]
      },
      {
        text: 'Ano ang pangunahing benepisyo ng pagkakaroon ng mataas na literacy rate?',
        options: [
          { text: 'Mas maraming panahon sa paglalaro', isCorrect: false },
          { text: 'Mas malaking kita sa trabaho', isCorrect: false },
          {
            text: 'Mas malawak na oportunidad sa edukasyon at trabaho',
            isCorrect: true
          },
          { text: 'Mas maraming oras sa pakikipagkaibigan', isCorrect: false }
        ]
      }
    ],
    [
      {
        text: 'What are the basic ingredients in bread making?',
        options: [
          { text: 'Flour, water, yeast, and sugar', isCorrect: false },
          { text: 'Flour, water, yeast, and salt', isCorrect: true },
          { text: 'Flour, butter, yeast, and salt', isCorrect: false },
          { text: 'Flour, eggs, water, and salt', isCorrect: false }
        ]
      },
      {
        text: 'What is gluten, and why is it important in bread making?',
        options: [
          { text: 'A type of starch that helps bread rise', isCorrect: false },
          { text: 'A sugar that adds sweetness to bread', isCorrect: false },
          {
            text: 'A protein that gives bread its structure and elasticity',
            isCorrect: true
          },
          { text: 'A fat that makes bread soft', isCorrect: false }
        ]
      },
      {
        text: 'What does "proofing" mean in bread making?',
        options: [
          { text: 'Baking the bread at a low temperature', isCorrect: false },
          {
            text: 'Letting the dough rest to develop flavor',
            isCorrect: false
          },
          { text: 'Allowing the dough to rise before baking', isCorrect: true },
          { text: 'Mixing the ingredients slowly', isCorrect: false }
        ]
      },
      {
        text: 'What type of yeast is most commonly used in baking?',
        options: [
          { text: 'Fresh yeast', isCorrect: false },
          { text: 'Wild yeast', isCorrect: false },
          { text: 'Active dry yeast and instant yeast', isCorrect: true },
          { text: 'Liquid yeast', isCorrect: false }
        ]
      }
    ],
    [
      {
        text: 'Where does red tide occur?',
        options: [
          { text: 'in land', isCorrect: false },
          { text: 'in air', isCorrect: false },
          { text: 'in sea', isCorrect: true }
        ]
      },
      {
        text: 'What cause red tide?',
        options: [
          { text: 'bacteria', isCorrect: false },
          { text: 'algae', isCorrect: true },
          { text: 'virus', isCorrect: false }
        ]
      },
      {
        text: 'What is the other term for red tide?',
        options: [
          { text: 'harmful tide', isCorrect: false },
          { text: 'harmful algal bloom', isCorrect: true },
          { text: 'strangers tide', isCorrect: false }
        ]
      }
    ],
    [
      {
        text: 'The number of rows in a worksheet is',
        options: [
          { text: '36500', isCorrect: false },
          { text: '5536', isCorrect: true },
          { text: '256', isCorrect: false }
        ]
      },
      {
        text: 'When a formatted number does not fit within a cell, it displays"',
        options: [
          { text: '#####', isCorrect: true },
          { text: '#DIV/0', isCorrect: false },
          { text: '#DIV@', isCorrect: false }
        ]
      },
      {
        text: 'What is the other term for red tide?',
        options: [
          { text: 'harmful tide', isCorrect: true },
          { text: 'harmful algal bloom', isCorrect: false },
          { text: 'strangers tide', isCorrect: false }
        ]
      }
    ],
    [
      {
        text: 'What is the primary goal of self-defense?',
        options: [
          { text: 'To hurt the attacker', isCorrect: false },
          { text: 'To protect yourself and escape from harm', isCorrect: true },
          { text: 'To win a fight', isCorrect: false }
        ]
      },
      {
        text: 'What is the most vulnerable part of an attackers body?',
        options: [
          { text: 'arms', isCorrect: false },
          { text: 'legs', isCorrect: false },
          { text: 'shoulders', isCorrect: true }
        ]
      },
      {
        text: 'What should you do if someone grabs your wrist?',
        options: [
          { text: 'Try to overpower them', isCorrect: false },
          { text: 'Pull your hand directly away from them', isCorrect: false },
          {
            text: 'Rotate your wrist towards the attackers thumb and pull away',
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
        cycleId: cycle.id
      }
    })

    for (const questionData of questionsData[i]) {
      await prisma.question.create({
        data: {
          text: questionData.text,
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
      currentPeriod: CyclePeriodType.IDLE,
      startedAt: new Date()
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    process.exit(1)
  })
