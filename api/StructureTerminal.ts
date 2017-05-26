/**
 * Sends any resources to a Terminal in another room. The destination Terminal can belong to any player.
 * Each transaction requires additional energy (regardless of the transfer resource type) that can be calculated using {@link Game.market.calcTransactionCost} method. For example, sending 1000 mineral units from W0N0 to W10N5 will consume 742 energy units.
 * You can track your incoming and outgoing transactions using the {@link Game.market} object.
 * Only one Terminal per room is allowed that can be addressed by {@link Room.terminal} property.
 *
 * Terminals are used in the {@link http://support.screeps.com/hc/en-us/articles/207783649-Market-system Market system}.
 *
 * <table class="table gameplay-info">
 *
 *     <tr>
 *         <td colspan="2"><b>Controller level</b></td>
 *     </tr>
 *     <tr>
 *         <td>1-5</td>
 *         <td>—</td>
 *     </tr>
 *     <tr>
 *         <td>6-8</td>
 *         <td>1 terminal</td>
 *     </tr>
 *     <tr>
 *         <td><b>Cost</b></td>
 *         <td>100,000</td>
 *     </tr>
 *     <tr>
 *         <td><b>Hits</b></td>
 *         <td>3,000</td>
 *     </tr>
 *     <tr>
 *         <td><b>Capacity</b></td>
 *         <td>300,000</td>
 *     </tr>
 *     <tr>
 *         <td><b>Cooldown on transfer</b></td>
 *         <td>10 ticks</td>
 *     </tr>
 *
 * </table>
 */
interface StructureTerminal extends OwnedStructure {
    /**
     * The remaining amount of ticks while this terminal cannot be used to make {@link StructureTerminal.send} or {@link Game.market.deal} calls.
     */
    cooldown: number,

    /**
     * An object with the storage contents. Each object key is one of the <code>RESOURCE_*</code> constants, values are resources amounts. <code>RESOURCE_ENERGY</code> is always defined and equals to 0 when empty, other resources are undefined when empty. You can use {@link https://github.com/lodash/lodash/blob/3.10.1/doc/README.md#_sumcollection-iteratee-thisarg lodash.sum} to get the total amount of contents.
     *
     * @example
     * if( !(RESOURCE_UTRIUM in Game.rooms['W1N1'].terminal.store) ) {
	 *     // need more utrium!
	 * }
     *
     * @example
     * const total = _.sum(Game.rooms['W1N1'].terminal.store);
     */
    store: { energy: number, [resourceType: string]: number },

    /**
     * The total amount of resources the storage can contain.
     */
    storeCapacity: number,

    /**
     * Sends resource to a Terminal in another room with the specified name.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {string} resourceType One of the <code>RESOURCE_*</code> constants.
     * @param {number} amount The amount of resources to be sent. The minimum amount is 100.
     * @param {string} destination The name of the target room. You don't have to gain visibility in this room.
     * @param {string} description (optional) The description of the transaction. It is visible to the recipient. The maximum length is 100 characters.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this structure.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_ENOUGH_RESOURCES}</td>
     *     <td>The structure does not have the required amount of resources.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_ARGS}</td>
     *     <td>The arguments provided are incorrect.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_TIRED}</td>
     *     <td>The terminal is still cooling down.</td>
     *   </tr>
     * </table>
     *
     * @example
     * Game.rooms['W1N1'].terminal.send(RESOURCE_UTRIUM, 100, 'W2N3',
     *    'trade contract #1');
     */
    send(resourceType: string, amount: number, destination: string, description?: string): number,

    /**
     * Transfer resource from this terminal to a creep. The target has to be at adjacent square. You can transfer resources to your creeps from hostile structures as well.
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
     * Game.rooms['W1N1'].terminal.transfer(creep, RESOURCE_ENERGY);
     */
    transfer(target: Creep, resourceType: string, amount?: number): number,
}