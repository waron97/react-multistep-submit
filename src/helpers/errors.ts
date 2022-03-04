interface Params {
  index: number;
  value: any;
}

export class StepRejectionError extends Error {
  index: number;
  value: any;
  constructor({ index, value }: Params) {
    super("");
    this.index = index;
    this.value = value;
  }
}

interface GroupErrorParams extends Params {
  groupItemIndex: number;
}

export class StepGroupItemRejectionError extends StepRejectionError {
  groupItemIndex: number;
  constructor({ groupItemIndex, value, index }: GroupErrorParams) {
    super({ index, value });
    this.groupItemIndex = groupItemIndex;
  }
}
