const OptionsService = require('../services/options.service');

class OptionsController {
    optionsService = new OptionsService();
  getOptions = async (req, res, next) => {

    const Options = await this.optionsService.findAllOption();

    res.status(200).json({ data: Options })
  }
//   extraPrice,shotPrice,hot,createdAt,updatedAt
createOption = async (req, res, next) => {
    const { extraPrice,shotPrice,hot } = req.body;

    // 서비스 계층에 구현된 createPost 로직을 실행합니다.
    const createOptionDate = await this.optionsService.createOption(extraPrice,shotPrice,hot);

    res.status(201).json({ data: createOptionDate });
  }

  deleteOption = async (req, res, next) => {
    const { optionId } = req.params;

    const deleteOption = await this.optionsService.deleteOption(optionId);

    res.status(200).json({ data: deleteOption });
  };
}



module.exports = OptionsController;