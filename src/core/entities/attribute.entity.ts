// Other dependencies
import { Column, Entity, OneToMany } from "typeorm";

// Local files
import { AbstractEntity } from "./abstract.entity";
import { MeasuringUnitEntity } from "./measuring-unit.entity";
import { UserPreferenceEntity } from "./user-preference.entity";

@Entity('attributes')
export class AttributeEntity extends AbstractEntity {
    @Column()
    name: string;

    @OneToMany(type => MeasuringUnitEntity, measuringUnit => measuringUnit.attribute)
    measuringUnit: MeasuringUnitEntity;

    @OneToMany(type => UserPreferenceEntity, userPreference => userPreference.attribute)
    userPreference: MeasuringUnitEntity;
}
