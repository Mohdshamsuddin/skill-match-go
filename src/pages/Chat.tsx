
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Send, 
  User, 
  MoreVertical, 
  Phone, 
  Plus,
  MessageCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock chat data
const mockContacts = [
  {
    id: "1",
    name: "Rajesh Sharma",
    company: "ABC Builders",
    role: "Site Manager",
    avatar: null,
    lastMessage: "Please bring your ID proof tomorrow.",
    timestamp: "2023-05-12T10:30:00",
    unread: 2
  },
  {
    id: "2",
    name: "Amit Kumar",
    company: "City Plumbing Services",
    role: "HR Manager",
    avatar: null,
    lastMessage: "Your interview is confirmed for tomorrow at 2:30 PM.",
    timestamp: "2023-05-11T16:45:00",
    unread: 0
  },
  {
    id: "3",
    name: "Priya Patel",
    company: "Private Household",
    role: "Employer",
    avatar: null,
    lastMessage: "Can you start next Monday?",
    timestamp: "2023-05-10T09:15:00",
    unread: 0
  }
];

// Mock messages
const mockMessages = {
  "1": [
    {
      id: "1",
      senderId: "1",
      text: "Hello, we've reviewed your application for Construction Helper.",
      timestamp: "2023-05-12T09:30:00",
      read: true
    },
    {
      id: "2",
      senderId: "user",
      text: "Hello sir, thank you for considering my application.",
      timestamp: "2023-05-12T09:35:00",
      read: true
    },
    {
      id: "3",
      senderId: "1",
      text: "We'd like to invite you for an on-site verification tomorrow.",
      timestamp: "2023-05-12T09:40:00",
      read: true
    },
    {
      id: "4",
      senderId: "user",
      text: "Yes, I can come tomorrow. What time would be suitable?",
      timestamp: "2023-05-12T09:45:00",
      read: true
    },
    {
      id: "5",
      senderId: "1",
      text: "Please come at 10 AM. Our site is located at Andheri East.",
      timestamp: "2023-05-12T09:50:00",
      read: true
    },
    {
      id: "6",
      senderId: "1",
      text: "Please bring your ID proof tomorrow.",
      timestamp: "2023-05-12T10:30:00",
      read: false
    },
    {
      id: "7",
      senderId: "1",
      text: "Also, wear proper safety shoes if you have them.",
      timestamp: "2023-05-12T10:32:00",
      read: false
    }
  ],
  "2": [
    {
      id: "1",
      senderId: "2",
      text: "Hello, this is Amit from City Plumbing Services.",
      timestamp: "2023-05-11T14:30:00",
      read: true
    },
    {
      id: "2",
      senderId: "user",
      text: "Hello Amit, how can I help you?",
      timestamp: "2023-05-11T14:35:00",
      read: true
    },
    {
      id: "3",
      senderId: "2",
      text: "We're impressed with your application for the Plumber position.",
      timestamp: "2023-05-11T14:40:00",
      read: true
    },
    {
      id: "4",
      senderId: "2",
      text: "Would you be available for an interview tomorrow?",
      timestamp: "2023-05-11T14:45:00",
      read: true
    },
    {
      id: "5",
      senderId: "user",
      text: "Yes, I'm available tomorrow. What time?",
      timestamp: "2023-05-11T15:00:00",
      read: true
    },
    {
      id: "6",
      senderId: "2",
      text: "How about 2:30 PM?",
      timestamp: "2023-05-11T15:15:00",
      read: true
    },
    {
      id: "7",
      senderId: "user",
      text: "That works for me. Where is your office located?",
      timestamp: "2023-05-11T15:30:00",
      read: true
    },
    {
      id: "8",
      senderId: "2",
      text: "We're at 45 Service Complex, Rohini, Delhi. I'll send you the Google Maps link.",
      timestamp: "2023-05-11T15:45:00",
      read: true
    },
    {
      id: "9",
      senderId: "2",
      text: "Your interview is confirmed for tomorrow at 2:30 PM.",
      timestamp: "2023-05-11T16:45:00",
      read: true
    }
  ],
  "3": [
    {
      id: "1",
      senderId: "3",
      text: "Hello, I saw your profile for domestic help position.",
      timestamp: "2023-05-10T08:30:00",
      read: true
    },
    {
      id: "2",
      senderId: "user",
      text: "Hello, yes I applied for the position.",
      timestamp: "2023-05-10T08:35:00",
      read: true
    },
    {
      id: "3",
      senderId: "3",
      text: "Do you have experience with cooking South Indian food?",
      timestamp: "2023-05-10T08:40:00",
      read: true
    },
    {
      id: "4",
      senderId: "user",
      text: "Yes, I have 3 years of experience cooking South Indian dishes.",
      timestamp: "2023-05-10T08:45:00",
      read: true
    },
    {
      id: "5",
      senderId: "3",
      text: "That's great! And are you comfortable with child care as well?",
      timestamp: "2023-05-10T08:50:00",
      read: true
    },
    {
      id: "6",
      senderId: "user",
      text: "Yes, I have experience taking care of children aged 3-10 years.",
      timestamp: "2023-05-10T08:55:00",
      read: true
    },
    {
      id: "7",
      senderId: "3",
      text: "Excellent. We're looking for someone who can start soon.",
      timestamp: "2023-05-10T09:00:00",
      read: true
    },
    {
      id: "8",
      senderId: "user",
      text: "I can start with a week's notice at my current job.",
      timestamp: "2023-05-10T09:05:00",
      read: true
    },
    {
      id: "9",
      senderId: "3",
      text: "Can you start next Monday?",
      timestamp: "2023-05-10T09:15:00",
      read: true
    }
  ]
};

// Quick reply templates
const quickReplies = [
  "Yes, I am interested in this job.",
  "Thank you for the opportunity.",
  "What time should I arrive for the interview?",
  "Where is the job location?",
  "What is the salary offered?",
  "I have experience in this field.",
  "When can I start?"
];

const Chat = () => {
  const { translate } = useLanguage();
  const [contacts, setContacts] = useState(mockContacts);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Filter contacts based on search
  const filteredContacts = contacts.filter(
    contact => 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Load messages when active chat changes
  useEffect(() => {
    if (activeChat) {
      setMessages(mockMessages[activeChat as keyof typeof mockMessages] || []);
      
      // Mark messages as read
      setContacts(prev => 
        prev.map(contact => 
          contact.id === activeChat ? { ...contact, unread: 0 } : contact
        )
      );
      
      // Scroll to bottom
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [activeChat]);
  
  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !activeChat) return;
    
    const newMsg = {
      id: `new-${Date.now()}`,
      senderId: "user",
      text: newMessage,
      timestamp: new Date().toISOString(),
      read: true
    };
    
    setMessages(prev => [...prev, newMsg]);
    setNewMessage("");
    setShowQuickReplies(false);
    
    // Update last message in contacts
    setContacts(prev => 
      prev.map(contact => 
        contact.id === activeChat 
          ? { ...contact, lastMessage: newMessage, timestamp: new Date().toISOString() }
          : contact
      )
    );
    
    // Scroll to bottom
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    
    // Simulate reply after delay
    if (activeChat === "1") {
      setTimeout(() => {
        const replyMsg = {
          id: `reply-${Date.now()}`,
          senderId: activeChat,
          text: "Great! I'll see you tomorrow at 10 AM then.",
          timestamp: new Date().toISOString(),
          read: true
        };
        
        setMessages(prev => [...prev, replyMsg]);
        
        // Update last message in contacts
        setContacts(prev => 
          prev.map(contact => 
            contact.id === activeChat 
              ? { ...contact, lastMessage: replyMsg.text, timestamp: replyMsg.timestamp }
              : contact
          )
        );
        
        // Scroll to bottom
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }, 1500);
    }
  };
  
  const handleQuickReply = (reply: string) => {
    setNewMessage(reply);
    setShowQuickReplies(false);
  };
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return translate("today");
    } else if (date.toDateString() === yesterday.toDateString()) {
      return translate("yesterday");
    } else {
      return date.toLocaleDateString();
    }
  };
  
  // Get active contact
  const activeContact = contacts.find(contact => contact.id === activeChat);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{translate("messages")}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contacts List */}
        <div className="md:col-span-1">
          <Card className="h-[calc(80vh-2rem)]">
            <CardHeader className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input 
                  type="search"
                  placeholder={translate("search_contacts")}
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(80vh-8rem)]">
                {filteredContacts.length > 0 ? (
                  <div>
                    {filteredContacts.map((contact) => (
                      <button
                        key={contact.id}
                        className={cn(
                          "w-full text-left px-4 py-3 border-b last:border-b-0 transition-colors",
                          activeChat === contact.id ? "bg-primary/10" : "hover:bg-gray-100"
                        )}
                        onClick={() => setActiveChat(contact.id)}
                      >
                        <div className="flex items-start">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={contact.avatar || undefined} />
                            <AvatarFallback className="bg-primary/20 text-primary">
                              {contact.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium truncate">{contact.name}</h4>
                              <span className="text-xs text-gray-500">
                                {formatDate(contact.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">
                              {contact.company}
                            </p>
                            <p className="text-xs text-gray-500 truncate mt-1">
                              {contact.lastMessage}
                            </p>
                          </div>
                          {contact.unread > 0 && (
                            <Badge className="ml-2 bg-primary text-white">
                              {contact.unread}
                            </Badge>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <MessageCircle className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="font-medium text-gray-700">
                      {translate("no_contacts_found")}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {translate("try_different_search")}
                    </p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        
        {/* Chat Area */}
        <div className="md:col-span-2">
          <Card className="h-[calc(80vh-2rem)]">
            {activeChat ? (
              <>
                <CardHeader className="p-4 border-b flex-row items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={activeContact?.avatar || undefined} />
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {activeContact?.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{activeContact?.name}</h3>
                      <p className="text-sm text-gray-500">{activeContact?.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0 flex flex-col h-[calc(80vh-8rem)]">
                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message, index) => {
                        const isUser = message.senderId === "user";
                        const showDate = index === 0 || 
                          new Date(message.timestamp).toDateString() !== 
                          new Date(messages[index - 1].timestamp).toDateString();
                        
                        return (
                          <div key={message.id}>
                            {showDate && (
                              <div className="flex justify-center my-4">
                                <Badge variant="outline" className="bg-gray-100">
                                  {formatDate(message.timestamp)}
                                </Badge>
                              </div>
                            )}
                            
                            <div className={cn(
                              "flex",
                              isUser ? "justify-end" : "justify-start"
                            )}>
                              {!isUser && (
                                <Avatar className="h-8 w-8 mr-2 mt-1">
                                  <AvatarFallback className="bg-primary/20 text-primary">
                                    {activeContact?.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              
                              <div className={cn(
                                "max-w-[75%] rounded-lg px-4 py-2 text-sm",
                                isUser 
                                  ? "bg-primary text-white rounded-br-none" 
                                  : "bg-gray-100 text-gray-800 rounded-bl-none"
                              )}>
                                <p>{message.text}</p>
                                <div className={cn(
                                  "text-xs mt-1 flex justify-end",
                                  isUser ? "text-primary-foreground/70" : "text-gray-500"
                                )}>
                                  {formatTime(message.timestamp)}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                  
                  {/* Quick Replies */}
                  {showQuickReplies && (
                    <div className="p-2 border-t bg-gray-50">
                      <ScrollArea className="whitespace-nowrap">
                        <div className="flex gap-2">
                          {quickReplies.map((reply, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="shrink-0 text-sm whitespace-normal h-auto"
                              onClick={() => handleQuickReply(reply)}
                            >
                              {reply}
                            </Button>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  )}
                  
                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setShowQuickReplies(!showQuickReplies)}
                        className={showQuickReplies ? "bg-primary/10" : ""}
                      >
                        <Plus className="h-5 w-5" />
                      </Button>
                      <div className="relative flex-1">
                        <Input 
                          placeholder={translate("type_message")}
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          className="pr-12"
                        />
                        <Button 
                          className="absolute right-0 top-0 h-full rounded-l-none"
                          onClick={handleSendMessage}
                          disabled={newMessage.trim() === ""}
                        >
                          <Send className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-4 text-center">
                <MessageCircle className="h-16 w-16 text-gray-300 mb-4" />
                <h2 className="text-xl font-semibold text-gray-700">
                  {translate("select_conversation")}
                </h2>
                <p className="text-gray-500 mt-2 max-w-md">
                  {translate("select_conversation_description")}
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;
