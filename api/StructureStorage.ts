/**
 * A structure that can store huge amount of resource units. Only one structure per room is allowed 
 * that can be addressed by {@link Room.storage} property.</p>
 *
 * <table class="table gameplay-info">
 *
 *     <tr>
 *         <td colspan="2"><b>Controller level</b></td>
 *     </tr>
 *     <tr>
 *         <td>1-3</td>
 *         <td>—</td>
 *     </tr>
 *     <tr>
 *         <td>4-8</td>
 *         <td>1 storage</td>
 *     </tr>
 *     <tr>
 *         <td><b>Cost</b></td>
 *         <td>30,000</td>
 *     </tr>
 *     <tr>
 *         <td><b>Hits</b></td>
 *         <td>10,000</td>
 *     </tr>
 *     <tr>
 *         <td><b>Capacity</b></td>
 *         <td>1,000,000</td>
 *     </tr>
 *
 * </table>
 */
interface StructureStorage extends OwnedStructure {
    /**
     * An object with the storage contents. Each object key is one of the <code>RESOURCE_*</code> constants, values are resources amounts. <code>RESOURCE_ENERGY</code> is always defined and equals to 0 when empty, other resources are undefined when empty. You can use {@link https://github.com/lodash/lodash/blob/3.10.1/doc/README.md#_sumcollection-iteratee-thisarg lodash.sum} to get the total amount of contents.
     *
     * @example
     * if(creep.room.storage.store[RESOURCE_ENERGY] == 0) {
	 *     // replenish the storage!
	 * }
     *
     * @example
     * if( !(RESOURCE_UTRIUM in creep.room.storage.store) ) {
	 *     // need more utrium!
	 * }
     *
     * @example
     * const total = _.sum(Game.rooms['W1N1'].storage.store);
     */
    store: { energy: number, [resourceType: string]: number },

    /**
     * The total amount of resources the storage can contain.
     */
    storeCapacity: number,

    /**
     * Transfer resource from this storage to a creep. The target has to be at adjacent square. You can transfer resources to your creeps from hostile structures as well.
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
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of the target creep, or there is a hostile rampart on top of the structure.</td>
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
     * storage.transfer(creep, RESOURCE_ENERGY);
     */
    transfer(target: Creep, resourceType: string, amount?: number): number,
}