import { Main } from "./imports/server-main/main";
import './imports/methods/methods';
import './imports/publications/chats.publication';
import './imports/publications/messages.publication';
import './imports/publications/users.publication';
import './imports/publications/listings.publication';
import './imports/publications/spring2017.publication';

const mainInstance = new Main();
mainInstance.start();
