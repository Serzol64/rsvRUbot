import torch
import torch.nn as nn

class Perceptron(nn.Module):
    def __init__(self, input_dim, hidden_dim, num_classes):
        super(Perceptron, self).__init__()

        self.fc1 = nn.Linear(input_dim, hidden_dim)
        self.fc2 = nn.Linear(hidden_dim, hidden_dim)
        self.fc3 = nn.Linear(hidden_dim, num_classes)

    def forward(self,x_in):
        y = self.fc1(x_in)
        y = torch.sigmoid(y).squeeze()
        y = self.fc2(y)
        y = torch.sigmoid(y).squeeze()
        y = self.fc3(y)

        return y
