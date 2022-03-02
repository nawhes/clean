/* eslint-disable class-methods-use-this */
import Academy from 'models/entity/Academy';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Academy)
export default class AcademyRepository extends Repository<Academy> {
	public async findAllSubjectNames(): Promise<string[][]> {
		return this.extractSubjectNames(await this.find());
	}

	private extractSubjectNames(academies: Academy[]) {
		return academies.map((academy) => academy.subjects.map((subject) => subject.name));
	}
}
