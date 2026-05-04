import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import { EnterInputComponentFinal } from "./EnterInputComponentFinal";

export class EnterInputFinal implements ComponentFramework.ReactControl<IInputs, IOutputs> {

    private notifyOutputChanged: () => void;
    private currentValue = "";

    constructor() {
        // No initialization required
    }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {

        const param = context.parameters.value;
        this.currentValue = param?.raw ?? "";

        const width = Number(context.mode.allocatedWidth) || 300;
        const height = Number(context.mode.allocatedHeight) || 44;

        return React.createElement(EnterInputComponentFinal, {
            value: this.currentValue,
            width,
            height,
            onChange: (v: string) => {
                this.currentValue = v;
                this.notifyOutputChanged();
            },
            onEnter: (v: string) => {
                this.currentValue = v;
                this.notifyOutputChanged();
            }
        });
    }

    public getOutputs(): IOutputs {
        return {
            value: this.currentValue
        };
    }

    public destroy(): void {
        // No cleanup required
    }
}
