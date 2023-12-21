import GetTextResponseDto from './GetTextResponseDto';

export default class GetTextsResponseDto extends Array<GetTextResponseDto> {
  constructor(items: GetTextResponseDto[]) {
    super(...items);
  }
}
