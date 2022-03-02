import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import type Academy from './Academy';

@Entity({ name: 'subject' })
export default class Subject {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar' })
	name: string;

	@ManyToOne('Academy', 'subjects')
	academy: Academy;

	constructor(name: string, academy: Academy) {
		this.name = name;
		this.academy = academy;
	}

	updateAcademy(academy: Academy): void {
		this.academy = academy;
	}
}
