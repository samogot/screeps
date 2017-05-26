/**
 * Allows to harvest a mineral deposit. Learn more about minerals from {@link http://docs.screeps.com/minerals.html this article}.</p>
 *
 * <table class="table gameplay-info">
 *
 *     <tr>
 *         <td><b>Controller level</b></td>
 *         <td>6</td>
 *     </tr>
 *     <tr>
 *         <td><b>Cost</b></td>
 *         <td>5,000</td>
 *     </tr>
 *     <tr>
 *         <td><b>Hits</b></td>
 *         <td>500</td>
 *     </tr>
 *     <tr>
 *         <td><b>Cooldown</b></td>
 *         <td>5 ticks on each <code>harvest</code> action</td>
 *     </tr>
 *
 * </table>
 */
interface StructureExtractor extends OwnedStructure {
    /**
     * The amount of game ticks until the next harvest action is possible.
     */
    cooldown: number,
}