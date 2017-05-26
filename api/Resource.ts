/**
 * A dropped piece of resource. It will decay after a while if not picked up.
 * Dropped resource pile decays for <code>ceil(amount/1000)</code> units per tick.
 */
interface Resource extends RoomObject {
    /**
     * The amount of resource units containing.
     */
    amount: number,

    /**
     * A unique object identificator. You can use {@link Game.getObjectById} method to retrieve an object instance by its <code>id</code>.
     */
    id: string,

    /**
     * One of the <code>RESOURCE_*</code> constants.
     */
    resourceType: string,
}