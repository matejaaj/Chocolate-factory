class CreateFactoryDTO {
	constructor(factory, selectedManagerId, managerDetails) {
		this.factory = factory;
		this.selectedManagerId = selectedManagerId;
		this.managerDetails = managerDetails;
	}
}

module.exports = CreateFactoryDTO;
