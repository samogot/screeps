/**
 * The base prototype for a structure that has an owner.
 * Such structures can be found using <code>FIND_MY_STRUCTURES</code> and <code>FIND_HOSTILE_STRUCTURES</code> constants.
 */
interface OwnedStructure extends Structure {
    /**
     * Whether this is your own structure.
     */
    my: boolean,

    /**
     * An object with the structure’s owner info containing the following properties:
     */
    owner: {

        /**
         * The name of the owner user.
         */
        username: string,
    },
}