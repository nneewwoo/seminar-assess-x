import { PrismaClient, cycle_period_type, response_period } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const user = await prisma.user.create({
		data: {
			name: 'Owen Garbosa',
			email: 'owen@garbosa.com',
			password: 'password',
			address: 'Roxas City, Capiz',
			phone: '09123456789'
		}
	});

	console.log('User created:', user);

	const cycle = await prisma.cycle.create({
		data: {
			month: 11,
			year: 2024
		}
	});

	console.log('Cycle created:', cycle);

	const seminar1 = await prisma.seminar.create({
		data: {
			title: 'Pagpanudlo nahungod sa edukasyon (LITERACY)',
			cycle_id: cycle.id,
			course: 'Education'
		}
	});

	console.log('Seminar 1 created:', seminar1);

	const questions1 = [
		{
			text: 'Ano ang pinakamalawak na kahulugan ng literacy?',
			options: [
				{ text: 'Kakayahang magsulat lamang', is_correct: false },
				{ text: 'Kakayahang magbasa, magsulat, at makaunawa', is_correct: true },
				{ text: 'Kakayahang magturo', is_correct: false },
				{ text: 'Kakayahang makinig', is_correct: false }
			]
		},
		{
			text: 'Ano ang pangunahing benepisyo ng pagkakaroon ng mataas na literacy rate?',
			options: [
				{ text: 'Mas maraming panahon sa paglalaro', is_correct: false },
				{ text: 'Mas malaking kita sa trabaho', is_correct: false },
				{ text: 'Mas malawak na oportunidad sa edukasyon at trabaho', is_correct: true },
				{ text: 'Mas maraming oras sa pakikipagkaibigan', is_correct: false }
			]
		}
	];

	for (const questionData of questions1) {
		const question = await prisma.question.create({
			data: {
				text: questionData.text,
				type: 'MULTIPLE_CHOICE',
				seminar_id: seminar1.id,
				options: {
					create: questionData.options
				}
			}
		});
		console.log(`Question 1 created: ${question.text}`);
	}

	const seminar2 = await prisma.seminar.create({
		data: {
			title: 'Pagpanudlo nahungod sa Bakes and Pastries',
			cycle_id: cycle.id,
			course: 'Food Technology'
		}
	});

	console.log('Seminar 2 created:', seminar2);

	const questions2 = [
		{
			text: 'What are the basic ingredients in bread making?',
			options: [
				{ text: 'Flour, water, yeast, and sugar', is_correct: false },
				{ text: 'Flour, water, yeast, and salt', is_correct: true },
				{ text: 'Flour, butter, yeast, and salt', is_correct: false },
				{ text: 'Flour, eggs, water, and salt', is_correct: false }
			]
		},
		{
			text: 'What is gluten, and why is it important in bread making?',
			options: [
				{ text: 'A type of starch that helps bread rise', is_correct: false },
				{ text: 'A sugar that adds sweetness to bread', is_correct: false },
				{ text: 'A protein that gives bread its structure and elasticity', is_correct: true },
				{ text: 'A fat that makes bread soft', is_correct: false }
			]
		},
		{
			text: 'What does "proofing" mean in bread making?',
			options: [
				{ text: 'Baking the bread at a low temperature', is_correct: false },
				{ text: 'Letting the dough rest to develop flavor', is_correct: false },
				{ text: 'Allowing the dough to rise before baking', is_correct: true },
				{ text: 'Mixing the ingredients slowly', is_correct: false }
			]
		},
		{
			text: 'What type of yeast is most commonly used in baking?',
			options: [
				{ text: 'Fresh yeast', is_correct: false },
				{ text: 'Wild yeast', is_correct: false },
				{ text: 'Active dry yeast and instant yeast', is_correct: true },
				{ text: 'Liquid yeast', is_correct: false }
			]
		}
	];

	for (const questionData of questions2) {
		const question = await prisma.question.create({
			data: {
				text: questionData.text,
				type: 'MULTIPLE_CHOICE',
				seminar_id: seminar2.id,
				options: {
					create: questionData.options
				}
			}
		});
		console.log(`Question 2 created: ${question.text}`);
	}

	const seminar3 = await prisma.seminar.create({
		data: {
			title: 'Pagpanudlo nahungod sa Fisheries Management',
			cycle_id: cycle.id,
			course: 'Fisheries'
		}
	});

	console.log('Seminar 3 created:', seminar3);

	const questions3 = [
		{
			text: 'Where does red tide occur?',
			options: [
				{ text: 'in land', is_correct: false },
				{ text: 'in air', is_correct: false },
				{ text: 'in sea', is_correct: true }
			]
		},
		{
			text: 'What cause red tide?',
			options: [
				{ text: 'bacteria', is_correct: false },
				{ text: 'algae', is_correct: true },
				{ text: 'virus', is_correct: false }
			]
		},
		{
			text: 'What is the other term for red tide?',
			options: [
				{ text: 'harmful tide', is_correct: false },
				{ text: 'harmful algal bloom', is_correct: true },
				{ text: 'strangers tide', is_correct: false }
			]
		}
	];

	for (const questionData of questions3) {
		const question = await prisma.question.create({
			data: {
				text: questionData.text,
				type: 'MULTIPLE_CHOICE',
				seminar_id: seminar3.id,
				options: {
					create: questionData.options
				}
			}
		});
		console.log(`Question 3 created: ${question.text}`);
	}

	const seminar4 = await prisma.seminar.create({
		data: {
			title: 'Pagpanudlo nahangod sa Electronic Spreadsheet',
			cycle_id: cycle.id,
			course: 'Computer Science'
		}
	});

	console.log('Seminar 4 created:', seminar4);

	const questions4 = [
		{
			text: 'The number of rows in a worksheet is',
			options: [
				{ text: '36500', is_correct: false },
				{ text: '5536', is_correct: true },
				{ text: '256', is_correct: false }
			]
		},
		{
			text: 'When a formatted number does not fit within a cell, it displays"',
			options: [
				{ text: '#####', is_correct: true },
				{ text: '#DIV/0', is_correct: false },
				{ text: '#DIV@', is_correct: false }
			]
		},
		{
			text: 'What is the other term for red tide?',
			options: [
				{ text: 'harmful tide', is_correct: true },
				{ text: 'harmful algal bloom', is_correct: false },
				{ text: 'strangers tide', is_correct: false }
			]
		}
	];

	for (const questionData of questions4) {
		const question = await prisma.question.create({
			data: {
				text: questionData.text,
				type: 'MULTIPLE_CHOICE',
				seminar_id: seminar4.id,
				options: {
					create: questionData.options
				}
			}
		});
		console.log(`Question 4 created: ${question.text}`);
	}

	const seminar5 = await prisma.seminar.create({
		data: {
			title: 'Pagpanudlo nahangod sa Self-Defense - Criminology',
			cycle_id: cycle.id,
			course: 'Crminology'
		}
	});

	console.log('Seminar 5 created:', seminar5);

	const questions5 = [
		{
			text: 'What is the primary goal of self-defense?',
			options: [
				{ text: 'To hurt the attacker', is_correct: false },
				{ text: 'To protect yourself and escape from harm', is_correct: true },
				{ text: 'To win a fight', is_correct: false }
			]
		},
		{
			text: 'What is the most vulnerable part of an attackers body?',
			options: [
				{ text: 'amrs', is_correct: false },
				{ text: 'legs', is_correct: false },
				{ text: 'shoulders', is_correct: true }
			]
		},
		{
			text: 'What should you do if someone grabs your wrist?',
			options: [
				{ text: 'Try to overpower them', is_correct: false },
				{ text: 'Pull your hand directly away from them', is_correct: false },
				{ text: 'Rotate your wrist towards the attackers thumb and pull away', is_correct: true }
			]
		}
	];

	for (const questionData of questions5) {
		const question = await prisma.question.create({
			data: {
				text: questionData.text,
				type: 'MULTIPLE_CHOICE',
				seminar_id: seminar5.id,
				options: {
					create: questionData.options
				}
			}
		});
		console.log(`Question 5 created: ${question.text}`);
	}

	const response = await prisma.response.create({
		data: {
			user_id: user.id,
			question_id: 1,
			selected_option_id: 1,
			period: response_period.VOTING,
			cycle_id: cycle.id
		}
	});

	console.log('Response created:', response);

	const cyclePeriod = await prisma.cycle_period.create({
		data: {
			cycle_id: cycle.id,
			current_period: cycle_period_type.VOTING,
			started_at: new Date()
		}
	});

	console.log('Cycle Period created:', cyclePeriod);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (error) => {
		console.error(error);
		process.exit(1);
	});
