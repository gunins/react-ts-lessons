export interface IScope {
    inputValue: number;
    totalValue: number;
}

type TCallback = (scope: IScope) => void;

class Counter {
    private listeners: TCallback[] = [];
    private scope: IScope;

    constructor(initialScope: IScope) {
        this.scope = initialScope;
    }

    add() {
        const {inputValue, totalValue} = this.scope;
        const result = inputValue + totalValue;
        this.set({inputValue, totalValue: result});
    }

    remove() {
        const {inputValue, totalValue} = this.scope;
        const result = totalValue - inputValue;
        this.set({inputValue, totalValue: result});
    }

    inputChange(value: number) {
        const {totalValue} = this.scope;
        this.set({inputValue: value, totalValue});
    }

    set(scope: IScope) {
        this.scope = scope;
        this.listeners.forEach((listener: TCallback) => {
            listener(scope);
        });
    }

    get() {
        return this.scope;
    }

    subscribe(listener: TCallback) {
        this.listeners = [...this.listeners, listener];
    }

    clear() {
        this.listeners = [];
    }
}

export const counter = (initialScope: IScope) => new Counter(initialScope);
