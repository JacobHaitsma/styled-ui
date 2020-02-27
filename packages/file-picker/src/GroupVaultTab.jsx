import React from 'react';
import { AmberTab } from './AmberTab';
import { useFilePickerContext } from './FilePickerContext';

export const GroupVaultTab = ({ title, filter, footerText, pickerMode, sort, viewStyle }) => {
	const { accountId } = useFilePickerContext();
	return (
		<AmberTab
			title={title}
			accountId={accountId}
			filter={filter}
			footerText={footerText}
			pickerMode={pickerMode}
			sort={sort}
			viewStyle={viewStyle}
		/>
	);
};

GroupVaultTab.defaultProps = {
	title: 'Group Vault',
};