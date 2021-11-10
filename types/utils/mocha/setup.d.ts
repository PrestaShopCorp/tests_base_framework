export declare const mochaHooks: {
    /**
     * Create unique browser for all mocha run
     */
    beforeAll: () => Promise<void>;
    /**
     * Close browser after finish the run
     */
    afterAll: () => Promise<void>;
};
