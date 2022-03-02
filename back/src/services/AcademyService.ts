import Academy from 'models/entity/Academy';
import Subject from 'models/entity/Subject';
import AcademyRepository from 'models/repository/AcademyRepository';
import { Service } from 'typedi';
import { getCustomRepository } from 'typeorm';

@Service()
export default class AcademyService {
	protected academyRepository = getCustomRepository(AcademyRepository);

	public async setup(): Promise<void> {
		const academies: Academy[] = [];
		for (let i = 50; i < 60; i++) {
			const academy = new Academy(`academy ${i}`);

			const subject = new Subject(`subject ${i}`, academy);
			academy.addSubject(subject);
			academies.push(academy);
		}
		this.academyRepository.save(academies);
	}

	public async test(): Promise<void> {
		const results = await this.academyRepository.findAllSubjectNames();

		console.log('RESULT', results);
	}
}
