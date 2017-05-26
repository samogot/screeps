/**
 * Contains energy which can be spent on spawning bigger creeps. Extensions can be placed anywhere in the room, any spawns will be able to use them regardless of distance.
 *
 * <table class="table gameplay-info">
 *
 *     <tr>
 *         <td colspan="2"><b>Controller level</b></td>
 *     </tr>
 *     <tr>
 *         <td>1</td>
 *         <td>—</td>
 *     </tr>
 *     <tr>
 *         <td>2</td>
 *         <td>5 extensions (50 capacity)</td>
 *     </tr>
 *     <tr>
 *         <td>3</td>
 *         <td>10 extensions (50 capacity)</td>
 *     </tr>
 *     <tr>
 *         <td>4</td>
 *         <td>20 extensions (50 capacity)</td>
 *     </tr>
 *     <tr>
 *         <td>5</td>
 *         <td>30 extensions (50 capacity)</td>
 *     </tr>
 *     <tr>
 *         <td>6</td>
 *         <td>40 extensions (50 capacity)</td>
 *     </tr>
 *     <tr>
 *         <td>7</td>
 *         <td>50 extensions (100 capacity)</td>
 *     </tr>
 *     <tr>
 *         <td>8</td>
 *         <td>60 extensions (200 capacity)</td>
 *     </tr>
 *     <tr>
 *         <td><b>Cost</b></td>
 *         <td>3,000</td>
 *     </tr>
 *     <tr>
 *         <td><b>Hits</b></td>
 *         <td>1,000</td>
 *     </tr>
 *
 * </table>
 */
interface StructureExtension extends OwnedStructure {
    /**
     * The amount of energy containing in the extension.
     */
    energy: number,

    /**
     * The total amount of energy the extension can contain.
     */
    energyCapacity: number,

    /**
     * Transfer the energy from the extension to a creep. You can transfer resources to your creeps from hostile structures as well.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {Creep} target The creep object which energy should be transferred to.
     * @param {number} amount (optional) The amount of energy to be transferred. If omitted, all the remaining amount of energy will be used.
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
     *     <td>The extension contains less energy than the given amount.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The specified target object is not a creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_FULL}</td>
     *     <td>The target creep can not carry the given amount of energy.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_IN_RANGE}</td>
     *     <td>The target creep is too far away.</td>
     *   </tr>
     * </table>
     *
     * @deprecated Please use {@link Creep.withdraw} instead.
     */
    transferEnergy(target: Creep, amount?: number): number,
}