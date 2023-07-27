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
    const createOptionDate = await this.optionsService.createOption(extraPrice,shotPrice,hot);

    res.status(201).json({ data: createOptionDate });
  }

  updateOption = async (req, res, next) => {
    const { optionId } = req.params;
    const { extraPrice,shotPrice,hot } = req.body;

    const updateOption = await this.optionsService.updateOption(
      optionId,
      extraPrice,
      shotPrice,
      hot
    );

    res.status(200).json({ data: updateOption });
  };

  deleteOption = async (req, res, next) => {
    const { optionId } = req.params;

    const deleteOption = await this.optionsService.deleteOption(optionId);

    res.status(200).json({ data: deleteOption });
  };
}



module.exports = OptionsController;