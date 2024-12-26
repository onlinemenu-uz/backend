import { EventSubscriber, EntitySubscriberInterface, UpdateEvent, InsertEvent } from "typeorm"
import * as bcrypt from "bcrypt";
import { User } from "../entities";

@EventSubscriber()
export class AuthenticationSubscriber implements EntitySubscriberInterface<User> {

    listenTo() {
        return User;
    }

    async beforeInsert({
        entity,
    }: InsertEvent<User>): Promise<void> {
        if (entity.password) {
            entity.password = await bcrypt.hash(entity.password, 10);
        }
    }

    async beforeUpdate({
        entity,
    }: UpdateEvent<User>): Promise<void> {
        if (entity.password) {
            entity.password = await bcrypt.hash(entity.password, 10);
        }
    }
}
