/**
 * Non-player structure. Spawns NPC Source Keepers that guards energy sources and minerals in some rooms. This structure cannot be destroyed.
 *
 * <table class="table gameplay-info">
 *
 *     <tr>
 *         <td><b>Spawning time</b></td>
 *         <td>300</td>
 *     </tr>
 *
 * </table>
 */
interface StructureKeeperLair extends OwnedStructure {
    /**
     * Time to spawning of the next Source Keeper.
     */
    ticksToSpawn: number,
}