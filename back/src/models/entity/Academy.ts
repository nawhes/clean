import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import type Subject from './Subject';

@Entity({ name: 'academy' })
export default class Academy {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', unique: true })
	name: string;

	@OneToMany('Subject', 'academy', {
		cascade: ['insert', 'update', 'remove', 'soft-remove', 'recover'],
		// eager: true,
		// lazy: true,
	})
	@JoinColumn({ name: 'id', referencedColumnName: 'academyId' })
	subjects: Subject[];

	constructor(name: string) {
		this.name = name;
	}

	addSubject(subject: Subject): void {
		if (this.subjects === undefined) this.subjects = [];
		this.subjects.push(subject);
		subject.updateAcademy(this);
	}
}
