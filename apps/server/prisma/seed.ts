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
      description: 'Enhancing reading, writing, and comprehension skills.'
    },
    {
      title: 'Bakes and Pastries',
      course: 'Food Technology',
      description: 'Techniques in baking breads, cakes, and pastries.'
    },
    {
      title: 'Fisheries Management',
      course: 'Fisheries',
      description: 'Knowledge and skills for sustainable fisheries management.'
    },
    {
      title: 'Electronic Spreadsheet',
      course: 'Computer Science',
      description: 'Basics and advanced features of electronic spreadsheets for data management.'
    },
    {
      title: 'Self-Defense',
      course: 'Criminology',
      description: 'Practical techniques for personal safety and self-defense.'
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
    questions: string[],
    description: string
  }

  const evaluations: Evaluation[] = [
    {
      title: 'The Topic',
      description: 'Evaluate the relevance, organization, and presentation of the training topic.',
      questions: [
        'The topic is relevant to my personal or work needs.',
        'The delivery of the topic is well-organized and systematic.',
        'The presentation or demo shown aligns with the training objectives.',
        'There are opportunities to ask questions for better understanding.'
      ],
      type: 'RATING'
    },
    {
      title: 'The Trainer',
      description: 'Assess the trainer’s knowledge, delivery, and ability to engage participants.',
      questions: [
        'The trainer demonstrates knowledge of the topic.',
        'The trainer ensures that the information provided is accurate and credible.',
        'The trainer delivers the topic clearly and understandably.',
        'The trainer explains well and speaks smoothly.',
        'The trainer answers questions clearly and makes the answers understandable to the participants.',
        'The trainer inspires participants to become interested in the topic.'
      ],
      type: 'RATING'
    },
    {
      title: 'The Facilitators',
      description: 'Evaluate the professionalism, helpfulness, and group management of the facilitators.',
      questions: [
        'The facilitators show professionalism in assisting with the training or seminar.',
        'The facilitators are respectful, patient, and helpful to the participants.',
        'The facilitators create a conducive and comfortable environment for learning new information.',
        'The facilitators manage the entire group to ensure a smooth flow of the training.'
      ],
      type: 'RATING'
    },
    {
      title: 'The Accommodation and Food',
      description: 'Provide feedback on the quality of the food and the comfort of the accommodations.',
      questions: [
        'The food provided is of good quality and nutritious.',
        'The accommodations ensure the comfort of the training participants.',
        'The training venue is appropriate and comfortable. (There are no distractions for the participants.)'
      ],
      type: 'RATING'
    },
    {
      title: 'General Satisfaction',
      description: 'Rate your overall satisfaction with the training experience.',
      questions: [
        'This training has met my expectations.',
        'This training is one of the best I have attended.',
        'This training has improved my knowledge, and I will continue applying what I have learned.'
      ],
      type: 'RATING'
    },
    {
      title: 'Feedback',
      description: 'Share your personal feedback and suggestions for improvement.',
      questions: [
        'What part of the training did you like the most?',
        'What else would you like us to improve or add to our training?'
      ],
      type: 'FEEDBACK'
    }
  ];
  

  for (let i = 0; i < evaluations.length; i++) {
    const evaluation = await prisma.eval.create({
      data: {
        title: evaluations[i].title,
        type: evaluations[i].type,
        description: evaluations[i].description
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
