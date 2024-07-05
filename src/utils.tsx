import { ReactElement } from "react";
import { act, render, RenderResult } from '@testing-library/react';

export const simpleRender = async (
    ui: ReactElement,
    { ...renderOptions } = {}
): Promise<RenderResult> => {
    let rendered: RenderResult = render(ui, { ...renderOptions });
    await act(async () => {
        rendered = render(ui, { ...renderOptions });
    });

    return rendered;
};
