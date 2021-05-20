export type PresetDatum<Vars> = {
  name: string;
  vars: Vars;
};

export type PresetData<Vars> = Array<PresetDatum<Vars>>;
