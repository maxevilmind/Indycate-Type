'use strict'
var expect = require('chai').expect;
var app = require('../main');

describe('A basic test',function() {
	it('should pass always', function() {
		expect(true).to.be.true;
	})
	it('should pass when file loads', function() {
		this.timeout(10000);
		expect(app.loadFile).to.not.throw(Error);
	})
	it('should pass when file saves', function() {
		expect(app.saveFile).to.not.throw(Error);
	})
	
})
