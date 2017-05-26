/**
 * A small container that can be used to store resources. This is a walkable structure. All dropped resources automatically goes to the container at the same tile.
 *
 * <table class="table gameplay-info">
 *
 *     <tr>
 *         <td><b>Controller level</b></td>
 *         <td>Any (including neutral rooms)</td>
 *     </tr>
 *     <tr>
 *         <td><b>Available per room</b></td>
 *         <td>5</td>
 *     </tr>
 *     <tr>
 *         <td><b>Capacity</b></td>
 *         <td>2,000</td>
 *     </tr>
 *     <tr>
 *         <td><b>Cost</b></td>
 *         <td>5,000</td>
 *     </tr>
 *     <tr>
 *         <td><b>Hits</b></td>
 *         <td>250,000</td>
 *     </tr>
 *     <tr>
 *         <td><b>Decay</b></td>
 *         <td>Loses 5,000 hits every 500 ticks in an owned room, and every 100 ticks in an unowned room.</td>
 *     </tr>
 *
 * </table>
 */
interface StructureContainer extends Structure {
    /**
     * An object with the structure contents. Each object key is one of the <code>RESOURCE_*</code> constants, values are resources amounts. <code>RESOURCE_ENERGY</code> is always defined and equals to 0 when empty, other resources are undefined when empty. You can use {@link https://github.com/lodash/lodash/blob/3.10.1/doc/README.md#_sumcollection-iteratee-thisarg lodash.sum} to get the total amount of contents.
     *
     * @example
     * const containersWithEnergy = room.find(FIND_STRUCTURES, {
	 *     filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
	 *                    i.store[RESOURCE_ENERGY] > 0
	 * });
     *
     * @example
     * const total = _.sum(container.store);
     */
    store: { energy: number, [resourceType: string]: number },

    /**
     * The total amount of resources the structure can contain.
     */
    storeCapacity: number,

    /**
     * The amount of game ticks when this container will lose some hit points.
     */
    ticksToDecay: number,

    /**
     * Transfer resource from this structure to a creep. The target has to be at adjacent square.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {Creep} target The target object.
     * @param {string} resourceType One of the <code>RESOURCE_*</code> constants.
     * @param {number} amount (optional) The amount of resources to be transferred. If omitted, all the available amount is used.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_ENOUGH_RESOURCES}</td>
     *     <td>The structure does not have the given amount of energy.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The target is not a valid object which can contain energy.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_FULL}</td>
     *     <td>The target cannot receive any more energy.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_IN_RANGE}</td>
     *     <td>The target is too far away.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_ARGS}</td>
     *     <td>The energy amount is incorrect.</td>
     *   </tr>
     * </table>
     *
     * @deprecated Please use {@link Creep.withdraw} instead.
     *
     * @example
     * const containers = creep.pos.findInRange(FIND_STRUCTURES, 1,
     *       {filter: {structureType: STRUCTURE_CONTAINER}});
     * containers[0].transfer(creep, RESOURCE_ENERGY);
     */
    transfer(target: Creep, resourceType: string, amount?: number): number,
}