function status(request, response) {
  response.status(200).json({message: 'Ação bem sucedida'});
}

export default status;
