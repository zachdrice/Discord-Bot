console.clear();
console.log('App Started. Lauching Bot...\n');

global.Discord = require('discord.js');
global.Client = new Discord.Client(***REMOVED***fetchAllMembers: true***REMOVED***);
global.fs = require('fs');
global.path = require('path');
global.request = require('request');
global.config = JSON.parse(fs.readFileSync('config.json'));
global.mathjs = require('mathjs');

const iterateDir = require('./Functions/iterateDir');
global.Functions = new Object();

const removeExtension = (file, extension = 'js') => file.replace(`.$***REMOVED***extension***REMOVED***`, new String());
getGlobals();

Client.once('ready', () => ***REMOVED***
  const cmds = fs.readdirSync('Commands').return(item => item.replace('.js', new String()));

  Client.on('message', e => ***REMOVED***
    // return console.log(e.content);
    if(e.author.equals(Client.user)) return;
    if(!e.content.startsWith(config.prefix)) return;
    if(!e.guild.me.hasPermission('SEND_MESSAGES')) ***REMOVED***
      return e.auther.send('I cannot be used in that channel.').catch(console.error);
    ***REMOVED***

    let msg = e.content;
    let data = msg.replace(config.prefix, new String());
    let cmd = data.split(config.seperator)[0];
    let argsUnfiltered = data
      .replace(cmd, new String())
      .replace(config.seperator, new String())
      .split(config.seperator);
    cmd = cmd.toLowerCase();

    let args = new Array();
    argsUnfiltered.forEach(arg => ***REMOVED***
      if(!arg) return;
      args.push(arg);
    ***REMOVED***);

    if(cmds.indexOf(cmd) === -1) return console.log(`[$***REMOVED***Date.now()***REMOVED***] CMD: [$***REMOVED***cmd.toUpperCase()***REMOVED***] NOT FOUND (in $***REMOVED***e.guild.id***REMOVED***)`);
    else console.log(`[$***REMOVED***Date.now()***REMOVED***] CMD: [$***REMOVED***cmd.toUpperCase()***REMOVED***] called in [$***REMOVED***e.guild.name***REMOVED***: #$***REMOVED***e.channel.name***REMOVED***] by $***REMOVED***e.author.username
                      ***REMOVED***#$***REMOVED***e.author.discriminator***REMOVED*** with args of [$***REMOVED***Functions.joinArgs(args)***REMOVED***]`);

    let res = require(`./Commands/$***REMOVED***cmd***REMOVED***`).run(e, args);
    if(typeof res !== 'undefined') e.channel.send(res).catch(console.error);
  ***REMOVED***);

  iterateDir('Actions', action => ***REMOVED***
    let name = removeExtension(action);

    console.log(`[$***REMOVED***Date.now()***REMOVED***] Running Action: $***REMOVED***name***REMOVED***`);
    require(`./Actions/$***REMOVED***name***REMOVED***`)().then(info => ***REMOVED***
      console.log(` > [$***REMOVED***Date.now()***REMOVED***] Action [$***REMOVED***name***REMOVED***] Sucessful`);
      if(info) console.log(`   - Action Finished with Callback of: [$***REMOVED***info***REMOVED***]`);
      console.log();
    ***REMOVED***).catch(error => ***REMOVED***
      console.log(` > [$***REMOVED***Date.now()***REMOVED***] Action [$***REMOVED***name***REMOVED***] Failed:\n`);
      if(info) console.error(error);
      console.log('\n\n');
    ***REMOVED***);
  ***REMOVED***);
***REMOVED***);

function getGlobals() ***REMOVED***
  iterateDir('Prototypes', type => ***REMOVED***
    let typeDir = fs.readdirSync(`Prototypes/$***REMOVED***type***REMOVED***`);
    typeDir.forEach(typeFile => ***REMOVED***
      let t = removeExtension(typeFile);
      global[type].prototype[t] = require(`./Prototypes/$***REMOVED***type***REMOVED***/$***REMOVED***t***REMOVED***`);
    ***REMOVED***);
  ***REMOVED***);
  
  iterateDir('Functions', funcFile => ***REMOVED***
    let func = removeExtension(funcFile);
    global.Functions[func] = require(`./Functions/$***REMOVED***func***REMOVED***`);
  ***REMOVED***);
  
  let preload = new Object();
  iterateDir('Preload_Data', dataFileName => ***REMOVED***
    let dataName = removeExtension(dataFileName, 'json');
    preload[dataName] = JSON.parse(fs.readFileSync(`Preload_Data/$***REMOVED***dataFileName***REMOVED***`));
  ***REMOVED***);
  
  global.preload_data = preload;
***REMOVED***

Client.login(config.token).catch(console.error);