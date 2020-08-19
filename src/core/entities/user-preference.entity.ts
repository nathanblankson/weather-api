// Other dependencies
import { Entity, ManyToOne, JoinColumn } from "typeorm";

// Local files
import { AbstractEntity } from "./abstract.entity";
import { AttributeEntity } from "./attribute.entity";
import { MeasuringUnitEntity } from "./measuring-unit.entity";
import { UserEntity } from "./user.entity";

@Entity('user_preferences')
export class UserPreferenceEntity extends AbstractEntity {

    @ManyToOne(() => AttributeEntity, attribute => attribute.id)
    @JoinColumn({ name: "attribute_id" })
    attribute: AttributeEntity;

    @ManyToOne(() => MeasuringUnitEntity, measuringUnit => measuringUnit.id)
    @JoinColumn({ name: "measuring_unit_id" })
    measuringUnit: MeasuringUnitEntity;

    @ManyToOne(() => UserEntity, user => user.id)
    @JoinColumn({ name: "user_id" })
    user: UserEntity;
}
