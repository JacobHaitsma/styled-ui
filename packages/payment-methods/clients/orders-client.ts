import { fetchJson } from './request';
import {
	IBillingProfilesDto,
	IBillingProfileDto,
	ICreateOrdersBillingProfileDto,
	ErrorMapper,
	IBillingProfileChangeSetDto,
} from './typings/orders';
import IErrors from './typings/orders/IErrors';
import { isErrorsDto } from './typings/orders/IErrorsDto';

export default class OrdersClient {
	static async getBillingProfiles(): Promise<IBillingProfilesDto> {
		const response = await fetchJson('/proxy/orders/v3/billingprofiles', {
			method: 'GET',
		});

		return response;
	}

	static async createOrdersBillingProfile(
		createBillingProfileDto: ICreateOrdersBillingProfileDto
	): Promise<IBillingProfileDto | IErrors> {
		try {
			const response: IBillingProfileDto = await fetchJson(`/proxy/orders/v3/billingprofiles`, {
				method: 'POST',
				body: JSON.stringify(createBillingProfileDto),
			});

			return response;
		} catch (e) {
			if (isErrorsDto(e)) {
				return ErrorMapper.mapErrors(e);
			}
			throw e;
		}
	}

	static async updateOrdersBillingProfile(
		billingProfileId: string,
		billingProfileChangeSet: IBillingProfileChangeSetDto
	): Promise<IBillingProfileDto | IErrors> {
		try {
			const response: IBillingProfileDto = await fetchJson(
				`/proxy/orders/v3/billingprofiles/${billingProfileId}`,
				{
					method: 'PATCH',
					body: JSON.stringify(billingProfileChangeSet),
				}
			);
			return response;
		} catch (e) {
			if (isErrorsDto(e)) {
				return ErrorMapper.mapErrors(e);
			}
			throw e;
		}
	}

	static async deleteOrdersBillingProfile(billingProfileId: string): Promise<void> {
		await fetchJson(`/proxy/orders/v3/billingprofiles/${billingProfileId}`, {
			method: 'DELETE',
		});
	}
}