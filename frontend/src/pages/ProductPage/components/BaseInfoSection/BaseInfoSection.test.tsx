import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import styles from './BaseInfoSection.module.scss';
import BaseInfoSection from './BaseInfoSection';

describe('BaseInfoSection', () => {
    it('switches main image when miniature is clicked', async () => {
        const user = userEvent.setup();

        const { container } = render(
            <BaseInfoSection
                title='Товар'
                description='Описание'
                price={100}
                characteristics={[{ label: 'Артикул', value: 'SKU-1' }]}
                images={[
                    { image: '/img-1.jpg', alt_text: 'Фото 1' },
                    { image: '/img-2.jpg', alt_text: 'Фото 2' },
                ]}
            />,
        );

        const mainImage = () => container.querySelector(`.${styles.image} img`) as HTMLImageElement | null;
        const miniatures = container.querySelectorAll(`.${styles.miniature}`);

        expect(mainImage()).not.toBeNull();
        expect(mainImage()?.getAttribute('src')).toBe('/img-1.jpg');

        await user.click(miniatures[1]);

        expect(mainImage()?.getAttribute('src')).toBe('/img-2.jpg');
    });
});
