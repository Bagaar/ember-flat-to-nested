'use strict';

const test = require('ava');
const fsExtra = require('fs-extra');
const path = require('path');
const recursiveCopy = require('recursive-copy');
const flatToNested = require('../lib');

test('flat to nested inside a project', async function (t) {
  await copyBlueprint('project-flat');
  await flatToNested(outputPath('project-flat'));

  t.false(await outputFileExists('project-flat/app/components/foo.js'));
  t.false(await outputFileExists('project-flat/app/components/foo.hbs'));
  t.false(await outputFileExists('project-flat/app/components/foo.css'));
  t.false(await outputFileExists('project-flat/app/components/foo/bar.js'));
  t.false(await outputFileExists('project-flat/app/components/foo/bar.hbs'));
  t.false(await outputFileExists('project-flat/app/components/foo/bar.css'));

  t.true(await outputFileExists('project-flat/app/components/foo/index.js'));
  t.true(await outputFileExists('project-flat/app/components/foo/index.hbs'));
  t.true(await outputFileExists('project-flat/app/components/foo/index.css'));
  t.true(await outputFileExists('project-flat/app/components/foo/bar/index.js'));
  t.true(await outputFileExists('project-flat/app/components/foo/bar/index.hbs'));
  t.true(await outputFileExists('project-flat/app/components/foo/bar/index.css'));
  t.true(await outputFileExists('project-flat/app/components/baz/index.js'));
  t.true(await outputFileExists('project-flat/app/components/baz/index.hbs'));
  t.true(await outputFileExists('project-flat/app/components/baz/index.css'));
});

test('nested to flat inside a project', async function (t) {
  await copyBlueprint('project-nested');
  await flatToNested(outputPath('project-nested'), { revert: true });

  t.true(await outputFileExists('project-nested/app/components/foo.js'));
  t.true(await outputFileExists('project-nested/app/components/foo.hbs'));
  t.true(await outputFileExists('project-nested/app/components/foo.css'));
  t.true(await outputFileExists('project-nested/app/components/foo/bar.js'));
  t.true(await outputFileExists('project-nested/app/components/foo/bar.hbs'));
  t.true(await outputFileExists('project-nested/app/components/foo/bar.css'));
  t.true(await outputFileExists('project-nested/app/components/baz.js'));
  t.true(await outputFileExists('project-nested/app/components/baz.hbs'));
  t.true(await outputFileExists('project-nested/app/components/baz.css'));

  t.false(await outputFileExists('project-nested/app/components/foo/index.js'));
  t.false(await outputFileExists('project-nested/app/components/foo/index.hbs'));
  t.false(await outputFileExists('project-nested/app/components/foo/index.css'));
  t.false(await outputFileExists('project-nested/app/components/foo/bar/index.js'));
  t.false(await outputFileExists('project-nested/app/components/foo/bar/index.hbs'));
  t.false(await outputFileExists('project-nested/app/components/foo/bar/index.css'));
});

test('flat to nested inside an addon', async function (t) {
  await copyBlueprint('addon-flat');
  await flatToNested(outputPath('addon-flat'));

  t.false(await outputFileExists('addon-flat/addon/components/foo.js'));
  t.false(await outputFileExists('addon-flat/addon/components/foo.hbs'));
  t.false(await outputFileExists('addon-flat/addon/components/foo.css'));
  t.false(await outputFileExists('addon-flat/addon/components/foo/bar.js'));
  t.false(await outputFileExists('addon-flat/addon/components/foo/bar.hbs'));
  t.false(await outputFileExists('addon-flat/addon/components/foo/bar.css'));

  t.true(await outputFileExists('addon-flat/addon/components/foo/index.js'));
  t.true(await outputFileExists('addon-flat/addon/components/foo/index.hbs'));
  t.true(await outputFileExists('addon-flat/addon/components/foo/index.css'));
  t.true(await outputFileExists('addon-flat/addon/components/foo/bar/index.js'));
  t.true(await outputFileExists('addon-flat/addon/components/foo/bar/index.hbs'));
  t.true(await outputFileExists('addon-flat/addon/components/foo/bar/index.css'));
  t.true(await outputFileExists('addon-flat/addon/components/baz/index.js'));
  t.true(await outputFileExists('addon-flat/addon/components/baz/index.hbs'));
  t.true(await outputFileExists('addon-flat/addon/components/baz/index.css'));
});

test('nested to flat inside an addon', async function (t) {
  await copyBlueprint('addon-nested');
  await flatToNested(outputPath('addon-nested'), { revert: true });

  t.true(await outputFileExists('addon-nested/addon/components/foo.js'));
  t.true(await outputFileExists('addon-nested/addon/components/foo.hbs'));
  t.true(await outputFileExists('addon-nested/addon/components/foo.css'));
  t.true(await outputFileExists('addon-nested/addon/components/foo/bar.js'));
  t.true(await outputFileExists('addon-nested/addon/components/foo/bar.hbs'));
  t.true(await outputFileExists('addon-nested/addon/components/foo/bar.css'));
  t.true(await outputFileExists('addon-nested/addon/components/baz.js'));
  t.true(await outputFileExists('addon-nested/addon/components/baz.hbs'));
  t.true(await outputFileExists('addon-nested/addon/components/baz.css'));

  t.false(await outputFileExists('addon-nested/addon/components/foo/index.js'));
  t.false(await outputFileExists('addon-nested/addon/components/foo/index.hbs'));
  t.false(await outputFileExists('addon-nested/addon/components/foo/index.css'));
  t.false(await outputFileExists('addon-nested/addon/components/foo/bar/index.js'));
  t.false(await outputFileExists('addon-nested/addon/components/foo/bar/index.hbs'));
  t.false(await outputFileExists('addon-nested/addon/components/foo/bar/index.css'));
});

async function copyBlueprint(blueprintName) {
  const blueprintPath = testPath('blueprints', blueprintName);
  const blueprintOutputPath = outputPath(blueprintName);

  await fsExtra.remove(blueprintOutputPath);

  return recursiveCopy(blueprintPath, blueprintOutputPath);
}

function outputFileExists(filePath) {
  return fsExtra.pathExists(outputPath(filePath));
}

function outputPath() {
  return testPath('output', ...arguments);
}

function testPath() {
  return path.join(__dirname, ...arguments);
}
