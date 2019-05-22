import React from 'react';
import styled from 'styled-components';

import { CollectibleFilterType } from '../../../util/filterable_collectibles';
import { Dropdown } from '../../common/dropdown';
import { DropdownTextItemWrapper } from '../../common/dropdown_text_item';
import { FilterIcon } from '../../common/icons/filter_icon';
import { RadioIcon } from '../../common/icons/radio_icon';
import { RadioIconActive } from '../../common/icons/radio_icon_active';

import { DropdownButton } from './collectibles_dropdown_button';
import { DropdownContainer } from './collectibles_dropdown_container';

interface Props {
    currentValue: CollectibleFilterType;
    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const options: { [key: string]: string } = {
    [CollectibleFilterType.ShowAll]: 'Show all',
    [CollectibleFilterType.FixedPrice]: 'Fixed Price',
    [CollectibleFilterType.DecliningAuction]: 'Declining Auction',
};

const DropdownItemFilter = styled(DropdownTextItemWrapper)`
    ${props => (props.active ? 'cursor: default;' : '')}
    align-items: center;
    display: flex;
    position: relative;

    input[type='radio'] {
        cursor: pointer;
        height: 100%;
        left: 0;
        opacity: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 5;

        &:checked {
            cursor: default;
            pointer-events: none;
        }
    }
`;

const Text = styled.span`
    margin-left: 14px;
    position: relative;
    z-index: 1;
`;

export const CollectiblesListFilter = (props: Props) => {
    const { currentValue, onChange, ...restProps } = props;
    const filterTypes = Object.keys(options) as CollectibleFilterType[];

    const header = <DropdownButton text={options[currentValue]} extraIcon={<FilterIcon />} />;

    const body = (
        <DropdownContainer>
            {filterTypes.map(filterType => (
                <DropdownItemFilter key={filterType} active={currentValue === filterType}>
                    <input checked={currentValue === filterType} onChange={onChange} type="radio" value={filterType} />
                    {currentValue === filterType ? <RadioIconActive /> : <RadioIcon />}
                    <Text>{options[filterType]}</Text>
                </DropdownItemFilter>
            ))}
        </DropdownContainer>
    );

    return <Dropdown body={body} header={header} {...restProps} />;
};
