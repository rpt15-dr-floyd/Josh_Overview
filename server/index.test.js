import React from 'react';
// const { shallow, mount, render } = require('enzyme');
import request from 'request';

test('API call with gameId should return information for a game with that id', (done) => {
  request('http://localhost:3000/api/overview/5d5619bedb3e3b2cadcd7f79', (err, res, body) => {
    let game = JSON.parse(body);
    expect(game._id).toBe('5d5619bedb3e3b2cadcd7f79');
    done();
  })
})

test('API call with gameId should contain all the necessary information for that game', (done) => {
  request('http://localhost:3000/api/overview/5d5619bedb3e3b2cadcd7f79', (err, res, body) => {
    let game = JSON.parse(body);
    expect(game.hasOwnProperty('game_name')).toBe(true);
    expect(game.hasOwnProperty('tags')).toBe(true);
    expect(game.hasOwnProperty('description')).toBe(true);
    expect(game.hasOwnProperty('release_date')).toBe(true);
    expect(game.hasOwnProperty('developer')).toBe(true);
    expect(game.hasOwnProperty('publisher')).toBe(true);
    done();
  })
})