// Other dependencies
import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from "typeorm";

// Local files
import { AbstractEntity } from "./abstract.entity";
import { AttributeEntity } from "./attribute.entity";
import { UserPreferenceEntity } from "./user-preference.entity";

@Entity('measuring_units')
export class MeasuringUnitEntity extends AbstractEntity {
    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => AttributeEntity, attribute => attribute.measuringUnit)
    @JoinColumn({ name: "attribute_id" })
    attribute: AttributeEntity;

    @OneToMany(() => UserPreferenceEntity, userPreference => userPreference.measuringUnit)
    userPreference: UserPreferenceEntity;
}
