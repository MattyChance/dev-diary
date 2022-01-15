export const errHandler = {
    reportError: (e: unknown): void => { // todo: this should not be unknown
        // eslint-disable-next-line no-console
        console.log('An error occured: ', e);
    }
};
