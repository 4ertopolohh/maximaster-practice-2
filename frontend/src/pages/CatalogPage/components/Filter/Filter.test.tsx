import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import Filter from './Filter';

describe('Filter', () => {
    it('calls onToggle when clicked', async () => {
        const onToggle = vi.fn();
        const user = userEvent.setup();

        render(
            <Filter
                title='По цене'
                isActive={false}
                isIconRotated={false}
                onToggle={onToggle}
            />,
        );

        await user.click(screen.getByRole('button'));

        expect(onToggle).toHaveBeenCalledTimes(1);
    });
});
