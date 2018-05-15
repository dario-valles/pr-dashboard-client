import io from 'socket.io-client';

const socket = url => store => {
  // TODO: 04 - Should we make sure that the user is authenticated here?
  // Technically, we are sending a token, this could be checked and ask the
  // server to save socketID for a specific user. Does that mean that we also
  // want to destroy in when `socket.on('disconnect', (socket) => {})`?
  // We might want to get variable in this scope and then update it on each
  // action dispatch?
  //
  // https://auth0.com/blog/auth-with-socket-io/
  //
  let socket = io(url);

  socket.on('message', data => {
    // TODO: 02 - Should we do HTTP requests here and then dispatch the actions?
    store.dispatch({
      type: data.type + '_received',
      data: data.payload,
    })
  });

  socket.on('exception', data => {
    // TODO: 03 - In which case should we use this?
    console.error(data.error);
    store.dispatch({
      type: data.type + '_error',
      error: data.error,
    })
  });

  return next => action => {
    // TODO: 01 - The following console logs are not triggered when dispatching
    // actions manually from Redux Chrome's extension ?
    console.log('ACTION');
    console.log(action);

    if(!action.socket) return next(action);

    const {message, payload} = action.socket;

    socket.emit('message', message, payload);

    next({
      ...action,
      type: action.type + '_sent'
    });
  }
}

export default socket;
