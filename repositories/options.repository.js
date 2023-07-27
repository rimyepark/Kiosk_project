const { Options } = require('../models');

class optionRepository {

  //옵션 조회
  findAllOption = async () => {
    const options = await Options.findAll();
    return options;
  }

  //해당 옵션 찾기
  findOptionById = async (optionId) => {
    const options = await Options.findByPk(optionId);
    return options;
  };

  //옵션 생성
  createOption = async (extraPrice,shotPrice,hot) => {
    const createOption = await Options.create({ extraPrice,shotPrice,hot });
    return createOption;
  }

 //옵션 수정
  updateOption = async (optionId, extraPrice,shotPrice,hot) => {
    const updateOptionData = await Options.update(
      { extraPrice,shotPrice,hot },
      { where: { optionId } }
    );

    return updateOptionData;
  };
  
  //옵션 삭제
  deleteOption = async (optionId) => {
    const deleteOptionData = await Options.destroy({ where: { optionId } });

    return deleteOptionData;
  };
}


module.exports = optionRepository;
